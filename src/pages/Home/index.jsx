import { useEffect, useMemo, useState } from "react";

import casinha from "../../assets/casinha_Home.svg";
import perfilSide from "../../assets/PerfilSideBar_Home.svg";
import settings from "../../assets/Settings_Home.svg";
import saida from "../../assets/Saida_Home.svg";
import perfilTop from "../../assets/PerfilTop_Home.svg";
import mascote from "../../assets/Mascote_Home.svg";
import { useAppSettings } from "../../context/useAppSettings.js";
import * as S from "./styles";

const STORAGE_KEY = "gestao-estoque-produtos";
const LOW_STOCK_LIMIT = 20;

const initialProducts = [
  { id: "sneaker", name: "Sneaker", available: 73, onHand: 121 },
  { id: "camiseta", name: "Camiseta básica", available: 12, onHand: 40 },
  { id: "bone", name: "Boné", available: 8, onHand: 15 },
];

function loadProducts() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return initialProducts;

    const products = JSON.parse(saved);
    return Array.isArray(products) ? products : initialProducts;
  } catch {
    return initialProducts;
  }
}

function Home() {
  const { t } = useAppSettings();
  const [products, setProducts] = useState(loadProducts);
  const [filter, setFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: "", available: "", onHand: "" });
  const [formError, setFormError] = useState("");

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isModalOpen]);

  const lowStockCount = products.filter(
    (product) => Number(product.available) < LOW_STOCK_LIMIT,
  ).length;
  const visibleProducts = useMemo(
    () => filter === "low"
      ? products.filter((product) => Number(product.available) < LOW_STOCK_LIMIT)
      : products,
    [filter, products],
  );
  const allVisibleSelected = visibleProducts.length > 0
    && visibleProducts.every((product) => selectedIds.includes(product.id));

  function closeModal() {
    setIsModalOpen(false);
    setForm({ name: "", available: "", onHand: "" });
    setFormError("");
  }

  function openModal() {
    setIsModalOpen(true);
    setFormError("");
  }

  function saveProduct(event) {
    event.preventDefault();
    const name = form.name.trim();
    const available = Number(form.available);
    const onHand = Number(form.onHand);

    if (!name) {
      setFormError(t("home.nameRequired"));
      return;
    }
    if (form.available === "" || form.onHand === "" || available < 0 || onHand < 0) {
      setFormError(t("home.quantitiesRequired"));
      return;
    }
    if (available > onHand) {
      setFormError(t("home.availableCannotExceed"));
      return;
    }

    const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random()}`;
    setProducts((current) => [...current, { id, name, available, onHand }]);
    setFilter("all");
    closeModal();
  }

  function toggleProduct(id) {
    setSelectedIds((current) => current.includes(id)
      ? current.filter((selectedId) => selectedId !== id)
      : [...current, id]);
  }

  function toggleVisibleProducts() {
    setSelectedIds((current) => allVisibleSelected
      ? current.filter((id) => !visibleProducts.some((product) => product.id === id))
      : [...new Set([...current, ...visibleProducts.map((product) => product.id)])]);
  }

  function removeProducts(ids) {
    const idsToRemove = new Set(ids);
    setProducts((current) => current.filter((product) => !idsToRemove.has(product.id)));
    setSelectedIds((current) => current.filter((id) => !idsToRemove.has(id)));
  }

  return (
    <S.Shell>
      <S.Side>
        <S.Logo>F</S.Logo>
        <S.Nav aria-label={t("nav.mainNavigation")}>
          <S.Item to="/home" end aria-label={t("nav.home")}><S.Icone src={casinha} alt="" /></S.Item>
          <S.Item to="/perfil" aria-label={t("nav.profile")}><S.Icone src={perfilSide} alt="" /></S.Item>
          <S.Item to="/configuracoes" aria-label={t("nav.settings")}><S.Icone src={settings} alt="" /></S.Item>
        </S.Nav>
        <S.Sair as="a" href="/login" aria-label={t("nav.logout")}><S.Icone src={saida} alt="" /></S.Sair>
      </S.Side>

      <S.Painel>
        <S.Topo>
          <div>
            <S.Eyebrow>{t("home.eyebrow")}</S.Eyebrow>
            <h1>{t("home.title")}</h1>
          </div>
          <S.TopActions>
            <S.AddButton type="button" onClick={openModal}>
              <span aria-hidden="true">+</span> {t("home.add")}
            </S.AddButton>
            <S.Perfil to="/perfil" aria-label={t("nav.profile")}><img src={perfilTop} alt="" /></S.Perfil>
          </S.TopActions>
        </S.Topo>

        <S.Destaques>
          <S.Welcome>
            <S.WelcomeCopy>
              <S.Ola>{t("home.welcome")}</S.Ola>
              <S.Mut>{t("home.welcomeText")}</S.Mut>
            </S.WelcomeCopy>
            <S.Mascote src={mascote} alt="" aria-hidden="true" />
          </S.Welcome>
          <S.Stat>
            <span className="stat-label">{t("home.productCount")}</span>
            <strong>{products.length}</strong>
          </S.Stat>
          <S.Stat $alert={lowStockCount > 0}>
            <span className="stat-label">{t("home.lowStock")}</span>
            <strong>{lowStockCount}</strong>
            <span className="stat-note">{t("home.lessThan", { limit: LOW_STOCK_LIMIT })}</span>
          </S.Stat>
        </S.Destaques>

        <S.Box>
          <S.TableHeader>
            <div>
              <h2>{t("home.products")}</h2>
              <p>{t("home.manageProducts")}</p>
            </div>
            {selectedIds.length > 0 && (
              <S.BulkActions>
                <span>{selectedIds.length} {t("home.selected")}</span>
                <S.DeleteButton type="button" onClick={() => removeProducts(selectedIds)}>
                  {t("home.removeSelected")}
                </S.DeleteButton>
              </S.BulkActions>
            )}
          </S.TableHeader>

          <S.Abas aria-label={t("home.filterProducts")}>
            <S.Aba type="button" $ativa={filter === "all"} onClick={() => setFilter("all")}>
              {t("home.allProducts")} <span>{products.length}</span>
            </S.Aba>
            <S.Aba type="button" $ativa={filter === "low"} onClick={() => setFilter("low")}>
              {t("home.lowStock")} <span>{lowStockCount}</span>
            </S.Aba>
          </S.Abas>

          <S.Rolagem>
            <table>
              <thead>
                <tr>
                  <th><S.Checkbox aria-label={t("home.selectAll")} checked={allVisibleSelected} onChange={toggleVisibleProducts} /></th>
                  <th>{t("home.product")}</th>
                  <th>{t("home.unavailable")}</th>
                  <th>{t("home.available")}</th>
                  <th>{t("home.onHand")}</th>
                  <th aria-label={t("home.actions")}></th>
                </tr>
              </thead>
              <tbody>
                {visibleProducts.map((product) => {
                  const available = Number(product.available);
                  const onHand = Number(product.onHand);
                  const productName = product.id === "sneaker"
                    ? t("product.sneaker")
                    : product.id === "camiseta"
                      ? t("product.camiseta")
                      : product.id === "bone"
                        ? t("product.bone")
                        : product.name;
                  return (
                    <S.Linha key={product.id} $marcada={selectedIds.includes(product.id)}>
                      <td>
                        <S.Checkbox
                          aria-label={t("home.selectProduct", { name: productName })}
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleProduct(product.id)}
                        />
                      </td>
                      <td>
                        <S.Produto>
                          <S.Mini aria-hidden="true">{productName.trim().charAt(0).toUpperCase()}</S.Mini>
                          <span>{productName}</span>
                        </S.Produto>
                      </td>
                      <td>{Math.max(onHand - available, 0)}</td>
                      <td><S.StockValue $low={available < LOW_STOCK_LIMIT}>{available}</S.StockValue></td>
                      <td>{onHand}</td>
                      <td>
                        <S.RowDelete type="button" onClick={() => removeProducts([product.id])} aria-label={t("home.removeProduct", { name: productName })} title={t("home.removeProduct", { name: productName })}>
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>
                        </S.RowDelete>
                      </td>
                    </S.Linha>
                  );
                })}
              </tbody>
            </table>
          </S.Rolagem>
          {visibleProducts.length === 0 && (
            <S.Vazio>
              <span aria-hidden="true">□</span>
              <strong>{filter === "low" ? t("home.noLowStock") : t("home.inventoryEmpty")}</strong>
              <p>{filter === "low" ? t("home.everythingStocked") : t("home.addFirstProduct")}</p>
              {filter === "all" && <S.AddButton type="button" onClick={openModal}>+ {t("home.add")}</S.AddButton>}
            </S.Vazio>
          )}
        </S.Box>
      </S.Painel>

      {isModalOpen && (
        <S.Overlay onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <S.Dialog role="dialog" aria-modal="true" aria-labelledby="add-product-title">
            <S.ModalTop>
              <h2 id="add-product-title">{t("home.modalTitle")}</h2>
              <S.CloseButton type="button" onClick={closeModal} aria-label={t("common.close")}>×</S.CloseButton>
            </S.ModalTop>
            <S.ProductForm onSubmit={saveProduct}>
              <S.ProductPreview aria-hidden="true">
                <S.BoxIcon><span /></S.BoxIcon>
              </S.ProductPreview>
              <S.FormFields>
                <S.Field>
                  <label htmlFor="product-name">{t("home.name")}</label>
                  <input id="product-name" autoFocus maxLength={80} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} placeholder={t("home.namePlaceholder")} />
                </S.Field>
                <S.Field>
                  <label htmlFor="product-available">{t("home.available").toLowerCase()}:</label>
                  <input id="product-available" type="number" min="0" step="1" value={form.available} onChange={(event) => setForm({ ...form, available: event.target.value })} placeholder="0" />
                </S.Field>
                <S.Field>
                  <label htmlFor="product-on-hand">{t("home.onHand").toLowerCase()}:</label>
                  <input id="product-on-hand" type="number" min="0" step="1" value={form.onHand} onChange={(event) => setForm({ ...form, onHand: event.target.value })} placeholder="0" />
                </S.Field>
                {formError && <S.FormError role="alert">{formError}</S.FormError>}
                <S.FormFooter>
                  <S.CancelButton type="button" onClick={closeModal}>{t("common.cancel")}</S.CancelButton>
                  <S.SaveButton type="submit">{t("home.saveProduct")}</S.SaveButton>
                </S.FormFooter>
              </S.FormFields>
            </S.ProductForm>
          </S.Dialog>
        </S.Overlay>
      )}
    </S.Shell>
  );
}

export default Home;
