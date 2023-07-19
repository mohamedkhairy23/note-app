import { useForm } from "react-hook-form";
import { User } from "../models/user";
import { LoggedInCredentials } from "../network/notes_api";
import * as NotesApi from "../network/notes_api";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import TextInputField from "./Form/TextInputField";
import stylesUtils from "../styles/utils.module.css";
import { useState } from "react";
import { ConflictError, UnAuthorizedError } from "../errors/httpErrors";
import { toast } from "react-toastify";

interface LoginModalProps {
  onDismiss: () => void;
  onLogInSuccessful: (user: User) => void;
}

const LogInModal = ({ onDismiss, onLogInSuccessful }: LoginModalProps) => {
  const [errorText, setErrorText] = useState<string | null>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoggedInCredentials>();

  async function onSubmit(credentials: LoggedInCredentials) {
    try {
      const user = await NotesApi.logIn(credentials);
      onLogInSuccessful(user);
    } catch (err) {
      if (err instanceof UnAuthorizedError) {
        setErrorText(err.message);
      } else if (err instanceof ConflictError) {
        toast.error(err.message);
      }
    }
  }
  return (
    <Modal show onHide={onDismiss}>
      <Modal.Header closeButton>
        <Modal.Title>Sign In</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorText && <Alert variant="danger">{errorText}</Alert>}
        <Form onSubmit={handleSubmit(onSubmit)}>
          <TextInputField
            name="username"
            type="text"
            label="Username"
            placeholder="Username"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.username}
          />
          <TextInputField
            name="password"
            type="password"
            label="Password"
            placeholder="Password"
            register={register}
            registerOptions={{ required: "Required" }}
            error={errors.password}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className={`${stylesUtils.width100} my-1`}
          >
            Sign In
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LogInModal;
