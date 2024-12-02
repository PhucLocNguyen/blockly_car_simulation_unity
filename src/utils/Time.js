import { t } from "i18next";

const getTimeAgoString = (timestamp) => {
  const now = new Date();
  const updatedTime = timestamp.toDate();
  const diffInMs = now - updatedTime;
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);

  if (diffInMinutes < 1) return t("now");
  if (diffInMinutes < 60) return `${t("minute_ago",{count:diffInMinutes})}`;
  if (diffInHours < 24) return `${t("hour_ago",{count:diffInHours})}`;
  if (diffInDays < 7) return `${t("day_ago",{count:diffInDays})}`;
  return `${diffInWeeks} ${t("week_ago",{count:diffInWeeks})}`;
};
export { getTimeAgoString };
