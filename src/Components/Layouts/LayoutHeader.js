import Header from "../Header";

function LayoutHeader(props) {
  return (
    <div>
      <Header />
      <div>{props.children}</div>
    </div>
  );
}

export default LayoutHeader;
