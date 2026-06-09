import { jsx, jsxs } from "react/jsx-runtime";
const SplitErrorComponent = ({
  error
}) => /* @__PURE__ */ jsx("div", { className: "container-luxe py-24 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-muted-foreground", children: [
  "Gagal memuat produk: ",
  error.message
] }) });
export {
  SplitErrorComponent as errorComponent
};
