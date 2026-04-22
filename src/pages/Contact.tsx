import { useTranslation } from "react-i18next";

const EMAIL = "sarahahmad17@gmail.com";

const Contact = () => {
  const { t } = useTranslation();
  return (
    <>
      <h2 className="text-center mb-4">{t("contact.title")}</h2>
      <div className="text-center" style={{ marginTop: 100 }}>
        <p className="h5 mb-3">{t("contact.prompt")}</p>
        <p className="text-muted mb-4">{t("contact.cta")}</p>
        <p>
          {t("contact.emailLabel")}{" "}
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </p>
      </div>
    </>
  );
};

export default Contact;
