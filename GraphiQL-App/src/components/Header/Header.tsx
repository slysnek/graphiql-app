export default function Header() {
  const isUserLogged = true;
  if (isUserLogged) {
    return <div>Hello from header</div>;
  }
  return <div>Header without sign-out button with links to log-in/signUp</div>;
}
