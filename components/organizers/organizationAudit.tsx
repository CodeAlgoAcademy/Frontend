import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizationAudit } from "services/organizersService";
import { RootState } from "store/store";
import ContentBox from "../parents/UI/ContentBox";
import { useTranslation } from "react-i18next";

const OrganizationAudit = () => {
  const { t } = useTranslation("organizer");
  const { 
    organizationAudit, 
    loading, 
    selectedOrganization 
  } = useSelector((state: RootState) => ({
    organizationAudit: state.organizer.organizationAudit,
    loading: state.organizer.isLoadingAnalytics,
    selectedOrganization: state.organizer.selectedOrganization
  }));

  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedOrganization?.id) {
      dispatch(getOrganizationAudit(selectedOrganization.id));
    }
  }, [dispatch, selectedOrganization?.id]);

  return (
    <ContentBox 
      title={t("auditLog")}
      padding="small"
      size="large"
      style={{ minWidth: "100%", maxWidth: "100%", height: "400px" }}
    >
      <div className="h-[350px] overflow-y-auto pr-2">
        {loading ? (
          <p className="text-center text-gray-500">{t("loadingAuditLog")}</p>
        ) : organizationAudit?.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {organizationAudit.map((log: any, idx: number) => (
              <li 
                key={idx} 
                className="rounded-md border border-gray-200 bg-white p-2 shadow-sm"
              >
                <p><span className="font-semibold">{t("userLabel")}</span> {log.actor_name || log.actor}</p>
                <p><span className="font-semibold">{t("actionLabel")}</span> {log.event_type}</p>
                <p><span className="font-semibold">{t("targetLabel")}</span> {log.target}</p>
                <p className="text-xs text-gray-500">
                  {new Date(log.timestamp).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-400">{t("noAuditRecords")}</p>
        )}
      </div>
    </ContentBox>
  );
};

export default OrganizationAudit;
