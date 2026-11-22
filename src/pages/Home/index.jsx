import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import casinha from "../../assets/casinha_Home.svg";
import perfilSide from "../../assets/PerfilSideBar_Home.svg";
import settings from "../../assets/Settings_Home.svg";
import saida from "../../assets/Saida_Home.svg";
import perfilTop from "../../assets/PerfilTop_Home.svg";
import mascoteClaro from "../../assets/MascoteClaro_Home.svg";
import mascoteEscuro from "../../assets/MascoteEscuro_Home.svg";
import logo from "../../assets/Logo_Site.svg";
import { useAppSettings } from "../../context/useAppSettings.js";
import { api } from "../../services/api.js";
import * as S from "./styles";

const LOW_STOCK_LIMIT = 20;
const DESCRIPTION_MAX_LENGTH = 255;
const EMPTY_FORM = {
  nome: "",
  descricao: "",
  preco: "",
  quantidade: "0",
  categoria_id: "",
  ativo: true,
};
const EMPTY_FIELD_ERRORS = {
  nome: "",
  descricao: "",
  preco: "",
  quantidade: "",
  categoria_id: "",
};

function Home() {
  const { t, language, theme } = useAppSettings();
  const mascote = theme === "light" ? mascoteClaro : mascoteEscuro;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [productRemovalPrompt, setProductRemovalPrompt] = useState(null);
  const [isConfirmingProductRemoval, setIsConfirmingProductRemoval] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [savingCategory, setSavingCategory] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState(EMPTY_FIELD_ERRORS);
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [quantityDrafts, setQuantityDrafts] = useState({});
  const [savingQuantities, setSavingQuantities] = useState([]);
  const [quantityMessages, setQuantityMessages] = useState({});
  const [deletingProductIds, setDeletingProductIds] = useState([]);
  const [deletingCategoryIds, setDeletingCategoryIds] = useState([]);
  const [isRemovingSelected, setIsRemovingSelected] = useState(false);

  const loadInventory = useCallback(async ({ quiet = false } = {}) => {
    if (!quiet) setLoading(true);
    try {
      const [productList, categoryList] = await Promise.all([
        api.listarProdutos(),
        api.listarCategorias(),
      ]);
      setError("");
      setProducts(productList);
      setCategories(categoryList);
      setQuantityDrafts({});
    } catch (requestError) {
      setError(requestError.message || t("home.loadError"));
    } finally {
      if (!quiet) setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    let active = true;
    Promise.all([api.listarProdutos(), api.listarCategorias()])
      .then(([productList, categoryList]) => {
        if (!active) return;
        setError("");
        setProducts(productList);
        setCategories(categoryList);
        setQuantityDrafts({});
      })
      .catch((requestError) => {
        if (active) setError(requestError.message || t("home.loadError"));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [t]);

  useEffect(() => {
    if (!isModalOpen && !isCategoryModalOpen && !productRemovalPrompt) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        if (isModalOpen) closeModal();
        if (isCategoryModalOpen) setIsCategoryModalOpen(false);
        if (productRemovalPrompt && !isConfirmingProductRemoval) setProductRemovalPrompt(null);
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isModalOpen, isCategoryModalOpen, productRemovalPrompt, isConfirmingProductRemoval]);

  const lowStockCount = products.filter(
    (product) => product.ativo && Number(product.quantidade) < LOW_STOCK_LIMIT,
  ).length;
  const visibleProducts = useMemo(() => {
    let result = filter === "low"
      ? products.filter((product) => product.ativo && Number(product.quantidade) < LOW_STOCK_LIMIT)
      : products;
    if (selectedCategoryId !== null) {
      result = result.filter((product) => Number(product.categoria_id) === selectedCategoryId);
    }
    const normalizedQuery = searchTerm.trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase();
    if (normalizedQuery) {
      result = result.filter((product) => {
        const searchableText = [product.nome, product.descricao, product.categorias?.nome]
          .filter(Boolean)
          .join(" ")
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toLocaleLowerCase();
        return searchableText.includes(normalizedQuery);
      });
    }
    return result;
  }, [filter, products, searchTerm, selectedCategoryId]);
  const allVisibleSelected = visibleProducts.length > 0
    && visibleProducts.every((product) => selectedIds.includes(product.id));

  function closeModal() {
    setIsModalOpen(false);
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFieldErrors(EMPTY_FIELD_ERRORS);
    setFormError("");
  }

  function openCreateModal() {
    setEditingProduct(null);
    setForm(EMPTY_FORM);
    setFieldErrors(EMPTY_FIELD_ERRORS);
    setFormError("");
    setIsModalOpen(true);
  }

  function openEditModal(product) {
    setEditingProduct(product);
    setForm({
      nome: product.nome ?? "",
      descricao: (product.descricao ?? "").slice(0, DESCRIPTION_MAX_LENGTH),
      preco: String(product.preco ?? ""),
      quantidade: String(product.quantidade ?? 0),
      categoria_id: product.categoria_id == null ? "" : String(product.categoria_id),
      ativo: Boolean(product.ativo),
    });
    setFieldErrors(EMPTY_FIELD_ERRORS);
    setFormError("");
    setIsModalOpen(true);
  }

  function validateProductForm() {
    const errors = { ...EMPTY_FIELD_ERRORS };
    const nome = form.nome.trim();
    const preco = form.preco === "" ? NaN : Number(form.preco);
    const quantidade = form.quantidade === "" ? NaN : Number(form.quantidade);

    if (!nome) errors.nome = t("home.nameRequired");
    if (form.descricao.length > DESCRIPTION_MAX_LENGTH) {
      errors.descricao = t("home.descriptionTooLong", { max: DESCRIPTION_MAX_LENGTH });
    }
    if (form.preco === "" || !Number.isFinite(preco) || preco < 0) {
      errors.preco = t("home.priceInvalid");
    }
    if (form.quantidade === "" || !Number.isInteger(quantidade) || quantidade < 0) {
      errors.quantidade = t("home.quantityInvalid");
    }
    setFieldErrors(errors);
    return Object.values(errors).every((e) => e === "");
  }

  async function saveProduct(event) {
    event.preventDefault();
    if (!validateProductForm()) return;

    const payload = {
      nome: form.nome.trim(),
      descricao: form.descricao.slice(0, DESCRIPTION_MAX_LENGTH).trim() || null,
      preco: Number(form.preco),
      quantidade: Number(form.quantidade),
      categoria_id: form.categoria_id === "" ? null : Number(form.categoria_id),
      ativo: form.ativo,
    };
    setSaving(true);
    setFormError("");
    try {
      const savedProduct = editingProduct
        ? await api.atualizarProduto(editingProduct.id, payload)
        : await api.criarProduto(payload);
      setProducts((current) => editingProduct
        ? current.map((product) => product.id === savedProduct.id ? savedProduct : product)
        : [...current, savedProduct]);
      setFilter("all");
      setSelectedCategoryId(null);
      closeModal();
    } catch (requestError) {
      setFormError(requestError.message || t("home.productSaveFailed"));
    } finally {
      setSaving(false);
    }
  }

  async function saveCategory(event) {
    event.preventDefault();
    const nome = categoryName.trim();
    if (!nome) {
      setCategoryError(t("home.categoryNameRequired"));
      return;
    }

    setSavingCategory(true);
    setCategoryError("");
    try {
      if (editingCategoryId) {
        const updated = await api.atualizarCategoria(editingCategoryId, nome);
        setCategories((current) => current.map((c) => c.id === updated.id ? updated : c).sort((a, b) => a.nome.localeCompare(b.nome)));
      } else {
        const category = await api.criarCategoria(nome);
        setCategories((current) => [...current, category].sort((first, second) => first.nome.localeCompare(second.nome)));
      }
      setCategoryName("");
      setEditingCategoryId(null);
    } catch (requestError) {
      setCategoryError(requestError.message || t("home.categorySaveFailed"));
    } finally {
      setSavingCategory(false);
    }
  }

  function openEditCategory(category) {
    setEditingCategoryId(category.id);
    setCategoryName(category.nome);
    setCategoryError("");
    setIsCategoryModalOpen(true);
  }

  function openCategoryModal() {
    setCategoryName("");
    setEditingCategoryId(null);
    setCategoryError("");
    setIsCategoryModalOpen(true);
  }

  async function deleteCategory(id) {
    setDeletingCategoryIds((current) => [...new Set([...current, id])]);
    setCategoryError("");
    try {
      await api.excluirCategoria(id);
      setCategories((current) => current.filter((c) => c.id !== id));
      if (selectedCategoryId === id) setSelectedCategoryId(null);
    } catch (requestError) {
      setCategoryError(requestError.message || t("home.categoryDeleteFailed"));
    } finally {
      setDeletingCategoryIds((current) => current.filter((categoryId) => categoryId !== id));
    }
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

  async function removeProducts(ids, fromBulkAction = false) {
    const idsToRemove = [...new Set(ids)];
    setDeletingProductIds((current) => [...new Set([...current, ...idsToRemove])]);
    if (fromBulkAction) setIsRemovingSelected(true);
    setError("");
    try {
      const results = await Promise.allSettled(idsToRemove.map((id) => api.excluirProduto(id)));
      setSelectedIds((current) => current.filter((id) => !idsToRemove.includes(id)));
      await loadInventory({ quiet: true });
      const failed = results.find((result) => result.status === "rejected");
      if (failed) setError(failed.reason?.message || t("home.loadError"));
    } finally {
      setDeletingProductIds((current) => current.filter((id) => !idsToRemove.includes(id)));
      if (fromBulkAction) setIsRemovingSelected(false);
    }
  }

  function askToRemoveProducts(ids, fromBulkAction = false) {
    const idsToRemove = [...new Set(ids)];
    if (idsToRemove.length === 0) return;
    setProductRemovalPrompt({ ids: idsToRemove, fromBulkAction });
  }

  async function confirmProductRemoval() {
    if (!productRemovalPrompt || isConfirmingProductRemoval) return;
    setIsConfirmingProductRemoval(true);
    try {
      await removeProducts(productRemovalPrompt.ids, productRemovalPrompt.fromBulkAction);
    } finally {
      setIsConfirmingProductRemoval(false);
      setProductRemovalPrompt(null);
    }
  }

  async function saveQuantity(product, rawValue) {
    const quantity = Number(rawValue);
    const currentQuantity = Number(product.quantidade);
    setQuantityDrafts((current) => {
      const next = { ...current };
      delete next[product.id];
      return next;
    });
    if (rawValue === "" || !Number.isInteger(quantity) || quantity < 0) {
      setError(t("home.productFieldsRequired"));
      return;
    }
    if (quantity === currentQuantity) return;

    setSavingQuantities((current) => [...new Set([...current, product.id])]);
    setQuantityMessages((current) => ({ ...current, [product.id]: "" }));
    setError("");
    try {
      const updatedProduct = quantity > currentQuantity
        ? await api.entrada(product.id, quantity - currentQuantity)
        : await api.saida(product.id, currentQuantity - quantity);
      setProducts((current) => current.map((item) => item.id === updatedProduct.id ? updatedProduct : item));
      setQuantityMessages((current) => ({ ...current, [product.id]: t("home.quantitySaved") }));
      window.setTimeout(() => {
        setQuantityMessages((current) => ({ ...current, [product.id]: "" }));
      }, 2200);
    } catch (requestError) {
      const message = `${t("home.quantitySaveFailed")} ${requestError.message}`;
      await loadInventory({ quiet: true });
      setError(message);
    } finally {
      setSavingQuantities((current) => current.filter((id) => id !== product.id));
    }
  }

  async function logout() {
    try {
      await api.logout();
    } finally {
      navigate("/login");
    }
  }

  function formatPrice(value) {
    return new Intl.NumberFormat(language === "pt" ? "pt-BR" : "en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(value));
  }

  return (
    <S.Shell>
      <S.Side>
        <S.Logo src={logo} alt={t("brand.logo")} />
        <S.Nav aria-label={t("nav.mainNavigation")}>
          <S.Item to="/home" end aria-label={t("nav.home")}><S.Icone src={casinha} alt="" /></S.Item>
          <S.Item to="/perfil" aria-label={t("nav.profile")}><S.Icone src={perfilSide} alt="" /></S.Item>
          <S.Item to="/configuracoes" aria-label={t("nav.settings")}><S.Icone src={settings} alt="" /></S.Item>
        </S.Nav>
        <S.Sair type="button" onClick={logout} aria-label={t("nav.logout")} title={t("nav.logout")}>
          <S.Icone src={saida} alt="" />
        </S.Sair>
      </S.Side>

      <S.Painel>
        <S.Topo>
          <div>
            <S.Eyebrow>{t("home.eyebrow")}</S.Eyebrow>
            <h1>{t("home.title")}</h1>
          </div>
          <S.TopActions>
            <S.TopCategoryButton type="button" onClick={openCategoryModal}>
              {t("home.manageCategories")}
            </S.TopCategoryButton>
            <S.AddButton type="button" onClick={openCreateModal}>
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
            <S.TableHeaderActions>
              <S.SearchWrap>
                <S.SearchIcon viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="10.8" cy="10.8" r="6.3" />
                  <path d="m15.5 15.5 4.2 4.2" />
                </S.SearchIcon>
                <S.SearchInput
                  type="search"
                  aria-label={t("home.searchProducts")}
                  placeholder={t("home.searchProducts")}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                />
              </S.SearchWrap>
              {selectedIds.length > 0 && (
                <S.BulkActions>
                  <span>{selectedIds.length} {t("home.selected")}</span>
                  <S.DeleteButton type="button" disabled={isRemovingSelected} onClick={() => askToRemoveProducts(selectedIds, true)}>
                    {isRemovingSelected && <S.LoadingSpinner aria-hidden="true" />}
                    {isRemovingSelected ? t("home.deleting") : t("home.removeSelected")}
                  </S.DeleteButton>
                </S.BulkActions>
              )}
            </S.TableHeaderActions>
          </S.TableHeader>

          <S.Abas aria-label={t("home.filterProducts")}>
            <S.Aba type="button" aria-pressed={filter === "all" && selectedCategoryId === null} $ativa={filter === "all" && selectedCategoryId === null} onClick={() => { setFilter("all"); setSelectedCategoryId(null); }}>
              {t("home.allProducts")} <span>{products.length}</span>
            </S.Aba>
            <S.Aba type="button" aria-pressed={filter === "low"} $ativa={filter === "low"} onClick={() => { setFilter("low"); setSelectedCategoryId(null); }}>
              {t("home.lowStock")} <span>{lowStockCount}</span>
            </S.Aba>
            <S.FilterSeparator aria-hidden="true">|</S.FilterSeparator>
            {categories.map((category) => (
              <S.CategoryFilterButton
                key={category.id}
                type="button"
                aria-pressed={selectedCategoryId === category.id}
                $ativa={selectedCategoryId === category.id}
                onClick={() => { setFilter("all"); setSelectedCategoryId(category.id); }}
              >
                {category.nome}
              </S.CategoryFilterButton>
            ))}
            <S.AddCategoryFilterButton
              type="button"
              aria-label={t("home.addCategory")}
              title={t("home.addCategory")}
              onClick={openCategoryModal}
            >
              +
            </S.AddCategoryFilterButton>
          </S.Abas>

          {error && <S.Alert role="alert">{error}</S.Alert>}
          {loading ? (
            <S.Loading role="status">{t("home.loading")}</S.Loading>
          ) : (
            <>
              <S.Rolagem>
                <table>
                  <thead>
                    <tr>
                      <th><S.Checkbox aria-label={t("home.selectAll")} checked={allVisibleSelected} onChange={toggleVisibleProducts} /></th>
                      <th>{t("home.product")}</th>
                      <th>{t("home.category")}</th>
                      <th>{t("home.price")}</th>
                      <th>{t("home.quantity")}</th>
                      <th>{t("home.status")}</th>
                      <th aria-label={t("home.actions")}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleProducts.map((product) => {
                      const productName = product.nome;
                      const isQuantitySaving = savingQuantities.includes(product.id);
                      return (
                        <S.Linha key={product.id} $marcada={selectedIds.includes(product.id)} $inativo={!product.ativo}>
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
                              <S.ProductDetails>
                                <strong>{productName}</strong>
                                {product.descricao && <small>{product.descricao}</small>}
                              </S.ProductDetails>
                            </S.Produto>
                          </td>
                          <td>{product.categorias?.nome || t("home.uncategorized")}</td>
                          <td>{formatPrice(product.preco)}</td>
                          <td>
                            <S.QuantityCell>
                              <S.InlineQuantity
                                aria-label={`${t("home.quantity")} ${productName}`}
                                type="number"
                                min="0"
                                step="1"
                                value={quantityDrafts[product.id] ?? String(product.quantidade)}
                                disabled={isQuantitySaving}
                                aria-busy={isQuantitySaving}
                                onChange={(event) => setQuantityDrafts((current) => ({ ...current, [product.id]: event.target.value }))}
                                onBlur={(event) => saveQuantity(product, event.target.value)}
                                onKeyDown={(event) => { if (event.key === "Enter") event.currentTarget.blur(); }}
                              />
                              <S.QuantityMessage role="status" aria-live="polite">
                                {isQuantitySaving
                                  ? <><S.LoadingSpinner aria-hidden="true" />{t("home.savingQuantity")}</>
                                  : quantityMessages[product.id] || ""}
                              </S.QuantityMessage>
                            </S.QuantityCell>
                          </td>
                          <td><S.StatusPill $active={product.ativo}>{product.ativo ? t("home.active") : t("home.inactive")}</S.StatusPill></td>
                          <td>
                            <S.RowActions>
                              <S.RowEdit type="button" onClick={() => openEditModal(product)} aria-label={t("home.editProduct", { name: productName })} title={t("home.edit")}>
                                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
                              </S.RowEdit>
                              <S.RowDelete type="button" disabled={deletingProductIds.includes(product.id)} aria-busy={deletingProductIds.includes(product.id)} onClick={() => askToRemoveProducts([product.id])} aria-label={t("home.removeProduct", { name: productName })} title={t("home.removeProduct", { name: productName })}>
                                {deletingProductIds.includes(product.id)
                                  ? <S.LoadingSpinner aria-hidden="true" />
                                  : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>}
                              </S.RowDelete>
                            </S.RowActions>
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
                  <strong>{searchTerm.trim() ? t("home.noSearchResults") : filter === "low" ? t("home.noLowStock") : selectedCategoryId !== null ? t("home.noCategoryProducts") : t("home.inventoryEmpty")}</strong>
                  <p>{searchTerm.trim() ? t("home.tryDifferentSearch") : filter === "low" ? t("home.everythingStocked") : selectedCategoryId !== null ? t("home.noCategoryProducts") : t("home.addFirstProduct")}</p>
                  {!searchTerm.trim() && filter === "all" && selectedCategoryId === null && <S.AddButton type="button" onClick={openCreateModal}>+ {t("home.add")}</S.AddButton>}
                </S.Vazio>
              )}
            </>
          )}
        </S.Box>
      </S.Painel>

      {isModalOpen && (
        <S.Overlay onMouseDown={(event) => event.target === event.currentTarget && closeModal()}>
          <S.Dialog role="dialog" aria-modal="true" aria-labelledby="product-modal-title">
            <S.ModalTop>
              <h2 id="product-modal-title">{editingProduct ? t("home.editModalTitle") : t("home.modalTitle")}</h2>
              <S.CloseButton type="button" onClick={closeModal} aria-label={t("common.close")}>×</S.CloseButton>
            </S.ModalTop>
            <S.ProductForm noValidate onSubmit={saveProduct}>
              <S.ProductPreview aria-hidden="true">
                <S.BoxIcon><span /></S.BoxIcon>
              </S.ProductPreview>
              <S.FormFields>
                <S.Field>
                  <label htmlFor="product-name">{t("home.name")}<S.RequiredMark aria-hidden="true">*</S.RequiredMark></label>
                  <input id="product-name" aria-required="true" autoFocus value={form.nome} onChange={(event) => setForm({ ...form, nome: event.target.value })} placeholder={t("home.namePlaceholder")} />
                  {fieldErrors.nome && <S.FieldError id="product-name-error">{fieldErrors.nome}</S.FieldError>}
                </S.Field>
                <S.Field>
                  <label htmlFor="product-description">{t("home.description")}</label>
                  <textarea id="product-description" rows="3" maxLength={DESCRIPTION_MAX_LENGTH} value={form.descricao} onChange={(event) => setForm((current) => ({ ...current, descricao: event.target.value.slice(0, DESCRIPTION_MAX_LENGTH) }))} placeholder={t("home.descriptionPlaceholder")} />
                  <S.FieldHint>{t("home.descriptionLimit", { count: form.descricao.length, max: DESCRIPTION_MAX_LENGTH })}</S.FieldHint>
                  {fieldErrors.descricao && <S.FieldError>{fieldErrors.descricao}</S.FieldError>}
                </S.Field>
                <S.Field>
                  <label htmlFor="product-price">{t("home.price")}<S.RequiredMark aria-hidden="true">*</S.RequiredMark></label>
                  <input id="product-price" type="number" min="0" step="1" aria-required="true" value={form.preco} onChange={(event) => setForm({ ...form, preco: event.target.value })} placeholder="0.00" />
                  {fieldErrors.preco && <S.FieldError>{fieldErrors.preco}</S.FieldError>}
                </S.Field>
                <S.Field>
                  <label htmlFor="product-quantity">{t("home.quantity")}<S.RequiredMark aria-hidden="true">*</S.RequiredMark></label>
                  <input id="product-quantity" type="number" min="0" step="1" aria-required="true" value={form.quantidade} onChange={(event) => setForm({ ...form, quantidade: event.target.value })} placeholder="0" />
                  {fieldErrors.quantidade && <S.FieldError>{fieldErrors.quantidade}</S.FieldError>}
                </S.Field>
                <S.Field>
                  <label htmlFor="product-category">{t("home.category")}</label>
                  <select id="product-category" value={form.categoria_id} onChange={(event) => setForm({ ...form, categoria_id: event.target.value })}>
                    <option value="">{t("home.categoryPlaceholder")}</option>
                    {categories.map((category) => <option key={category.id} value={category.id}>{category.nome}</option>)}
                  </select>
                  {fieldErrors.categoria_id && <S.FieldError>{fieldErrors.categoria_id}</S.FieldError>}
                </S.Field>
                <S.ActiveToggle>
                  <S.Checkbox id="product-active" checked={form.ativo} onChange={(event) => setForm({ ...form, ativo: event.target.checked })} />
                  <label htmlFor="product-active">{t("home.active")}</label>
                </S.ActiveToggle>
                {formError && <S.FormError role="alert">{formError}</S.FormError>}
                <S.FormFooter>
                  <S.CancelButton type="button" onClick={closeModal}>{t("common.cancel")}</S.CancelButton>
                  <S.SaveButton type="submit" disabled={saving}>
                    {saving ? t("home.loading") : editingProduct ? t("home.updateProduct") : t("home.saveProduct")}
                  </S.SaveButton>
                </S.FormFooter>
              </S.FormFields>
            </S.ProductForm>
          </S.Dialog>
        </S.Overlay>
      )}

      {isCategoryModalOpen && (
        <S.Overlay onMouseDown={(event) => event.target === event.currentTarget && setIsCategoryModalOpen(false)}>
          <S.Dialog role="dialog" aria-modal="true" aria-labelledby="category-modal-title">
            <S.ModalTop>
              <h2 id="category-modal-title">{t("home.manageCategories")}</h2>
              <S.CloseButton type="button" onClick={() => setIsCategoryModalOpen(false)} aria-label={t("common.close")}>×</S.CloseButton>
            </S.ModalTop>
            <S.CategoryCreateForm noValidate onSubmit={saveCategory}>
              <label htmlFor="new-category-name">{t("home.categoryName")}<S.RequiredMark aria-hidden="true">*</S.RequiredMark></label>
              <S.CategoryInput
                id="new-category-name"
                aria-required="true"
                autoFocus
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                placeholder={t("home.categoryNamePlaceholder")}
              />
              {categoryError && <S.CategoryError role="alert">{categoryError}</S.CategoryError>}
              <S.FormFooter>
                <S.CancelButton type="button" onClick={() => { setIsCategoryModalOpen(false); setEditingCategoryId(null); setCategoryName(""); }}>{t("common.cancel")}</S.CancelButton>
                <S.SaveButton type="submit" disabled={savingCategory}>
                  {savingCategory ? t("home.loading") : editingCategoryId ? t("home.updateCategory") : t("home.addCategory")}
                </S.SaveButton>
              </S.FormFooter>
            </S.CategoryCreateForm>
            <S.CategoryList aria-label={t("home.manageCategories")}>
              {categories.length === 0
                ? <S.CategoryEmpty>{t("home.categoriesEmpty")}</S.CategoryEmpty>
                : categories.map((category) => (
                    <S.CategoryItem key={category.id}>
                      <span>{category.nome}</span>
                      <S.CategoryActions>
                        <S.RowEdit type="button" onClick={() => openEditCategory(category)} aria-label={t("home.editCategory", { name: category.nome })} title={t("home.edit")}>
                          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z" /></svg>
                        </S.RowEdit>
                        <S.RowDelete type="button" disabled={deletingCategoryIds.includes(category.id)} aria-busy={deletingCategoryIds.includes(category.id)} onClick={() => deleteCategory(category.id)} aria-label={t("home.removeCategory", { name: category.nome })} title={t("home.removeCategory", { name: category.nome })}>
                          {deletingCategoryIds.includes(category.id)
                            ? <S.LoadingSpinner aria-hidden="true" />
                            : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 13h10l1-13M9 7V4h6v3" /></svg>}
                        </S.RowDelete>
                      </S.CategoryActions>
                    </S.CategoryItem>
                  ))}
            </S.CategoryList>
          </S.Dialog>
        </S.Overlay>
      )}

      {productRemovalPrompt && (() => {
        const { ids } = productRemovalPrompt;
        const product = ids.length === 1
          ? products.find((item) => item.id === ids[0])
          : null;
        const closePrompt = () => {
          if (!isConfirmingProductRemoval) setProductRemovalPrompt(null);
        };

        return (
          <S.Overlay onMouseDown={(event) => event.target === event.currentTarget && closePrompt()}>
            <S.ConfirmDialog role="alertdialog" aria-modal="true" aria-labelledby="remove-products-title" aria-describedby="remove-products-message remove-products-warning">
              <S.ModalTop>
                <h2 id="remove-products-title">{t("home.confirmRemoveTitle")}</h2>
                <S.CloseButton type="button" onClick={closePrompt} disabled={isConfirmingProductRemoval} aria-label={t("common.close")}>×</S.CloseButton>
              </S.ModalTop>
              <S.ConfirmMessage id="remove-products-message">
                {product
                  ? t("home.confirmRemoveProduct", { name: product.nome })
                  : t("home.confirmRemoveProducts", { count: ids.length })}
              </S.ConfirmMessage>
              <S.ConfirmWarning id="remove-products-warning">{t("home.confirmRemoveWarning")}</S.ConfirmWarning>
              <S.FormFooter>
                <S.CancelButton type="button" onClick={closePrompt} disabled={isConfirmingProductRemoval} autoFocus>{t("common.cancel")}</S.CancelButton>
                <S.DeleteButton type="button" onClick={confirmProductRemoval} disabled={isConfirmingProductRemoval} aria-busy={isConfirmingProductRemoval}>
                  {isConfirmingProductRemoval && <S.LoadingSpinner aria-hidden="true" />}
                  {isConfirmingProductRemoval ? t("home.deleting") : t("home.confirmRemove")}
                </S.DeleteButton>
              </S.FormFooter>
            </S.ConfirmDialog>
          </S.Overlay>
        );
      })()}
    </S.Shell>
  );
}

export default Home;
