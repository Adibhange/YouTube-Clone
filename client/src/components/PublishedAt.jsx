import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

export const PublishedAt = ({ createdAt }) => {
  return (
    <>
      <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
    </>
  );
};
