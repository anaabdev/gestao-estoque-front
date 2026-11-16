import { useState } from "react";

import casinha from "../../assets/casinha_Home.svg";
import perfilSide from "../../assets/PerfilSideBar_Home.svg";
import settingsIcon from "../../assets/Settings_Home.svg";
import saida from "../../assets/Saida_Home.svg";
import perfilTop from "../../assets/PerfilTop_Home.svg";
import { useAppSettings } from "../../context/useAppSettings.js";
import * as H from "../Home/styles";
import * as S from "./styles";

function Configuracoes() {
  const { language, setLanguage, theme, setTheme, resetSettings, t } = useAppSettings();
  const [resetMessage, setResetMessage] = useState("");

  function restoreDefaults() {
    resetSettings();
    setResetMessage(true);
  }

  return (
    <H.Shell>
      <H.Side>
        <H.Logo>F</H.Logo>
        <H.Nav aria-label={t("nav.mainNavigation")}>
          <H.Item to="/home" end aria-label={t("nav.home")}><H.Icone src={casinha} alt="" /></H.Item>
          <H.Item to="/perfil" aria-label={t("nav.profile")}><H.Icone src={perfilSide} alt="" /></H.Item>
          <H.Item to="/configuracoes" aria-label={t("nav.settings")}><H.Icone src={settingsIcon} alt="" /></H.Item>
        </H.Nav>
        <H.Sair as="a" href="/login" aria-label={t("nav.logout")}><H.Icone src={saida} alt="" /></H.Sair>
      </H.Side>

      <H.Painel>
        <H.Topo>
          <div>
            <H.Eyebrow>{t("settings.eyebrow")}</H.Eyebrow>
            <h1>{t("settings.title")}</h1>
          </div>
          <H.TopActions>
            <H.Perfil to="/perfil" aria-label={t("nav.profile")}><img src={perfilTop} alt="" /></H.Perfil>
          </H.TopActions>
        </H.Topo>

        <S.Intro>
          <h2>{t("settings.introTitle")}</h2>
          <p>{t("settings.intro")}</p>
        </S.Intro>

        <S.SettingsGrid>
          <S.SettingsCard>
            <S.CardHeading>
              <S.CardIcon aria-hidden="true">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.6 2.8-.2-.1a1.7 1.7 0 0 0-1.8.1 1.7 1.7 0 0 0-.8 1.5v.2H8.6v-.2a1.7 1.7 0 0 0-.8-1.5 1.7 1.7 0 0 0-1.8-.1l-.2.1-1.6-2.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.4-1H3v-3.2h.2a1.7 1.7 0 0 0 1.4-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.6-2.8.2.1a1.7 1.7 0 0 0 1.8-.1 1.7 1.7 0 0 0 .8-1.5v-.2h6.8v.2a1.7 1.7 0 0 0 .8 1.5 1.7 1.7 0 0 0 1.8.1l.2-.1 1.6 2.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.4 1h.2V14h-.2a1.7 1.7 0 0 0-1.4 1Z" /></svg>
              </S.CardIcon>
              <div>
                <h2>{t("settings.appearance")}</h2>
                <p>{t("settings.appearanceHelp")}</p>
              </div>
            </S.CardHeading>

            <S.ThemeChoices role="group" aria-label={t("settings.appearance")}>
            <S.ThemeOption type="button" $active={theme === "dark"} aria-pressed={theme === "dark"} onClick={() => { setTheme("dark"); setResetMessage(false); }}>
                <S.ThemePreview $theme="dark" aria-hidden="true"><span /><span /><span /></S.ThemePreview>
                <S.OptionTitle>
                  <span>{t("settings.dark")}</span>
                  {theme === "dark" && <S.SelectedMark $theme aria-hidden="true">✓</S.SelectedMark>}
                </S.OptionTitle>
                <S.OptionDescription>{t("settings.darkDescription")}</S.OptionDescription>
              </S.ThemeOption>
            <S.ThemeOption type="button" $active={theme === "light"} aria-pressed={theme === "light"} onClick={() => { setTheme("light"); setResetMessage(false); }}>
                <S.ThemePreview $theme="light" aria-hidden="true"><span /><span /><span /></S.ThemePreview>
                <S.OptionTitle>
                  <span>{t("settings.light")}</span>
                  {theme === "light" && <S.SelectedMark $theme aria-hidden="true">✓</S.SelectedMark>}
                </S.OptionTitle>
                <S.OptionDescription>{t("settings.lightDescription")}</S.OptionDescription>
              </S.ThemeOption>
            </S.ThemeChoices>
          </S.SettingsCard>

          <S.SettingsCard>
            <S.CardHeading>
              <S.CardIcon $language aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 5h10M9 3v2m4 0c-.4 4.1-3.3 7.2-7.5 9m1-5c1.5 2.3 3.4 4 6.5 5M13 20l4-10 4 10m-6.5-3h5" /></svg>
              </S.CardIcon>
              <div>
                <h2>{t("settings.language")}</h2>
                <p>{t("settings.languageHelp")}</p>
              </div>
            </S.CardHeading>

            <S.LanguageChoices role="group" aria-label={t("settings.language")}>
              <S.LanguageOption type="button" $active={language === "pt"} aria-pressed={language === "pt"} onClick={() => { setLanguage("pt"); setResetMessage(""); }}>
                <S.Flag aria-hidden="true">BR</S.Flag>
                <span>{t("settings.portuguese")}</span>
                {language === "pt" && <S.SelectedMark aria-hidden="true">✓</S.SelectedMark>}
              </S.LanguageOption>
              <S.LanguageOption type="button" $active={language === "en"} aria-pressed={language === "en"} onClick={() => { setLanguage("en"); setResetMessage(""); }}>
                <S.Flag $english aria-hidden="true">EN</S.Flag>
                <span>{t("settings.english")}</span>
                {language === "en" && <S.SelectedMark aria-hidden="true">✓</S.SelectedMark>}
              </S.LanguageOption>
            </S.LanguageChoices>
          </S.SettingsCard>

          <S.SettingsFooter>
            <div>
              <p>{t("settings.appliedImmediately")}</p>
              <small>{resetMessage ? t("settings.resetDone") : t("settings.resetHelp")}</small>
            </div>
            <S.ResetButton type="button" onClick={restoreDefaults}>{t("settings.reset")}</S.ResetButton>
          </S.SettingsFooter>
        </S.SettingsGrid>
      </H.Painel>
    </H.Shell>
  );
}

export default Configuracoes;
