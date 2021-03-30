import styles from "./StateSWR.module.css";

const StateSWR = ({ error }: { error?: boolean }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <h1 style={{ color: "black" }}>Noe gikk galt :(</h1>
      ) : (
        <svg className={styles.spinner} viewBox="0 0 50 50">
          <circle
            className={styles.path}
            cx="25"
            cy="25"
            r="20"
            fill="none"
            strokeWidth="5"
          ></circle>
        </svg>
      )}
    </div>
  );
};
export default StateSWR;
