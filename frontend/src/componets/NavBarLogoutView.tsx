import { Button } from "react-bootstrap";

interface NavBarLogoutViewProps {
  onSignUpclicked: () => void;
  onLogInClicked: () => void;
}
const NavBarLogoutView = ({
  onSignUpclicked,
  onLogInClicked,
}: NavBarLogoutViewProps) => {
  return (
    <>
      <Button onClick={onSignUpclicked}>Sign Up</Button>
      <Button onClick={onLogInClicked}>Sign In</Button>
    </>
  );
};

export default NavBarLogoutView;
