/* eslint-disable-next-line */
export interface DemoProps {}

export function Demo(props: DemoProps) {
  return (
    <div>
      <style jsx>{`
        div {
          color: pink;
        }
      `}</style>
      <h1>Welcome to demo!</h1>
    </div>
  );
}

export default Demo;
