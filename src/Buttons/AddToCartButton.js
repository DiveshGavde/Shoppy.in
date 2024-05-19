export default function AddToCartButton({
  cssClass,
  children,
  clickEvents,
  isDisable,
}) {
  return (
    <button disabled={isDisable} onClick={clickEvents} className={cssClass}>
      {children}
    </button>
  );
}
