/* eslint-disable-next-line */
export interface SharedUiProps {}

export function SharedUi(props: SharedUiProps) {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to shared-ui!</h1>
    </div>
  );
}

export default SharedUi;
