import { useState } from "react";

import casinha from "../../assets/casinha_Home.svg";
import perfilSide from "../../assets/PerfilSideBar_Home.svg";
import settings from "../../assets/Settings_Home.svg";
import saida from "../../assets/Saida_Home.svg";
import perfilTop from "../../assets/PerfilTop_Home.svg";
import { useAppSettings } from "../../context/useAppSettings.js";
import * as H from "../Home/styles";
import * as S from "./styles";

const PROFILE_STORAGE_KEY = "gestao-estoque-perfil";

function loadProfile() {
  try {
    const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (storedProfile) return JSON.parse(storedProfile);
  } catch {
    // Keep the form usable if browser storage is unavailable.
  }
  return { fullName: "", birthday: "" };
}

function Perfil() {
  const { t } = useAppSettings();
  const [profile, setProfile] = useState(loadProfile);
  const [profileMessage, setProfileMessage] = useState("");
  const [password, setPassword] = useState({ current: "", next: "" });
  const [passwordMessage, setPasswordMessage] = useState("");

  function saveProfile(event) {
    event.preventDefault();
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
      setProfileMessage(t("profile.saved"));
    } catch {
      setProfileMessage(t("profile.saveFailed"));
    }
  }

  function changePassword(event) {
    event.preventDefault();
    if (password.next.length < 8) {
      setPasswordMessage(t("profile.passwordMinLength"));
      return;
    }

    setPasswordMessage(t("profile.passwordUnavailable"));
  }

  return (
    <H.Shell>
      <H.Side>
        <H.Logo>F</H.Logo>
        <H.Nav aria-label={t("nav.mainNavigation")}>
          <H.Item to="/home" end aria-label={t("nav.home")}><H.Icone src={casinha} alt="" /></H.Item>
          <H.Item to="/perfil" aria-label={t("nav.profile")}><H.Icone src={perfilSide} alt="" /></H.Item>
          <H.Item to="/configuracoes" aria-label={t("nav.settings")}><H.Icone src={settings} alt="" /></H.Item>
        </H.Nav>
        <H.Sair as="a" href="/login" aria-label={t("nav.logout")}><H.Icone src={saida} alt="" /></H.Sair>
      </H.Side>

      <H.Painel>
        <H.Topo>
          <div>
            <H.Eyebrow>{t("profile.eyebrow")}</H.Eyebrow>
            <h1>{t("profile.title")}</h1>
          </div>
          <H.TopActions>
            <H.Perfil to="/perfil" aria-label={t("nav.profile")}><img src={perfilTop} alt="" /></H.Perfil>
          </H.TopActions>
        </H.Topo>

        <S.PageIntro>
          <h2>{t("profile.yourAccount")}</h2>
          <p>{t("profile.intro")}</p>
        </S.PageIntro>

        <S.Sections>
          <S.SectionCard>
            <S.SectionHeading>
              <S.SectionIcon aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="3.5" /><path d="M5 20c.7-3.7 3.1-5.6 7-5.6s6.3 1.9 7 5.6" /></svg>
              </S.SectionIcon>
              <div>
                <h2>{t("profile.personalData")}</h2>
                <p>{t("profile.personalHelp")}</p>
              </div>
            </S.SectionHeading>

            <S.Form onSubmit={saveProfile}>
              <S.Field>
                <label htmlFor="profile-full-name">{t("profile.fullName")}</label>
                <input
                  id="profile-full-name"
                  type="text"
                  autoComplete="name"
                  maxLength={100}
                  placeholder={t("profile.fullNamePlaceholder")}
                  value={profile.fullName}
                  onChange={(event) => {
                    setProfile({ ...profile, fullName: event.target.value });
                    setProfileMessage("");
                  }}
                  required
                />
              </S.Field>
              <S.Field>
                <label htmlFor="profile-birthday">{t("profile.birthday")}</label>
                <input
                  id="profile-birthday"
                  type="date"
                  autoComplete="bday"
                  value={profile.birthday}
                  onChange={(event) => {
                    setProfile({ ...profile, birthday: event.target.value });
                    setProfileMessage("");
                  }}
                />
              </S.Field>
              <S.FormFooter>
                <S.Status role="status">{profileMessage}</S.Status>
                <S.PrimaryButton type="submit">{t("common.save")}</S.PrimaryButton>
              </S.FormFooter>
            </S.Form>
          </S.SectionCard>

          <S.SectionCard>
            <S.SectionHeading>
              <S.SectionIcon $accent aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v2" /></svg>
              </S.SectionIcon>
              <div>
                <h2>{t("profile.passwordTitle")}</h2>
                <p>{t("profile.passwordHelp")}</p>
              </div>
            </S.SectionHeading>

            <S.Form onSubmit={changePassword}>
              <S.Field>
                <label htmlFor="current-password">{t("profile.currentPassword")}</label>
                <input
                  id="current-password"
                  type="password"
                  autoComplete="current-password"
                  placeholder={t("profile.currentPasswordPlaceholder")}
                  value={password.current}
                  onChange={(event) => {
                    setPassword({ ...password, current: event.target.value });
                    setPasswordMessage("");
                  }}
                  required
                />
              </S.Field>
              <S.Field>
                <label htmlFor="new-password">{t("profile.newPassword")}</label>
                <input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder={t("profile.newPasswordPlaceholder")}
                  value={password.next}
                  onChange={(event) => {
                    setPassword({ ...password, next: event.target.value });
                    setPasswordMessage("");
                  }}
                  minLength={8}
                  required
                />
              </S.Field>
              <S.FormFooter>
                <S.Status $warning role="status">{passwordMessage}</S.Status>
                <S.PrimaryButton type="submit">{t("profile.changePassword")}</S.PrimaryButton>
              </S.FormFooter>
            </S.Form>
          </S.SectionCard>
        </S.Sections>
      </H.Painel>
    </H.Shell>
  );
}

export default Perfil;
