import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-center mb-4">{t("about.title")}</h2>
      <h4>{t("about.storyTitle")}</h4>
      <p>{t("about.storyText")}</p>
      <h4>{t("about.missionTitle")}</h4>
      <p>{t("about.missionText")}</p>
      <h4>{t("about.teamTitle")}</h4>
      <p>{t("about.teamText")}</p>
    </>
  )
}

export default About
