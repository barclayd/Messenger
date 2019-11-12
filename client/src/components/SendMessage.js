import React from 'react';
import styled from 'styled-components';
import { withFormik } from 'formik';
import { Input, Button, Icon } from 'semantic-ui-react';
import FileUpload from './FileUpload';

const SendMessageWrapper = styled.div`
  grid-column: 3;
  grid-row: 3;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 30fr;
`;

const ENTER_KEY = 13;

const SendMessage = ({
  placeholder,
  values,
  handleBlur,
  isSubmitting,
  handleChange,
  handleSubmit,
}) => (
  <SendMessageWrapper>
    <FileUpload>
      <Button icon>
        <Icon name="plus" />
      </Button>
    </FileUpload>
    <Input
      name="message"
      onBlur={handleBlur}
      onChange={handleChange}
      value={values.message}
      placeholder={`Message #${placeholder}`}
      onKeyDown={(e) => {
        if (e.keyCode === ENTER_KEY && !isSubmitting) {
          handleSubmit(e);
        }
      }}
    />
  </SendMessageWrapper>
);

export default withFormik({
  mapPropsToValues: () => ({ message: '' }),
  handleSubmit: async (values, { props: { onSubmit }, resetForm }) => {
    if (!values.message || !values.message.trim()) {
      resetForm(false);
      return;
    }

    await onSubmit(values.message);
    // if (createMessage) {
    //   resetForm();
    // }
  },
})(SendMessage);
