import { Button, Form, Input } from 'antd';
import NavbarContext from 'contexts/NavbarContext';
import classes from './style.module.less';
import { useEffect } from 'react';

type AuthFormProps = {
    type: 'sign-in' | 'sign-up';
}

function AuthForm({ type }: AuthFormProps) {
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({});
    }, [type]);

    const getFormInput = (name: string, label: string, message: string) => (
        <Form.Item 
            {...{ name, label }}
            rules = {[{
                required: true,
                message
            }]}
        >
            <Input/>
        </Form.Item>
    );

    const handleFinish = (values: any) => {
        console.log(values)
    }

    return (
        <NavbarContext>
            <div className = {classes.formContainer}>
                <div className = {classes.innerContainer}>
                    <div className = {classes.title}>
                    {
                        type === 'sign-up'
                        ? 'Регистрация'
                        : 'Вход'
                    }
                    </div>

                    <Form
                        initialValues = {{}}
                        form = {form}
                        layout = 'vertical'
                        style = {{ width: 350 }}
                        onFinish = {handleFinish}
                        requiredMark = {false}
                        validateTrigger = 'onSubmit'
                    >
                    { type === 'sign-up' && getFormInput('name', 'Име', 'Името е задължително') }
                    { type === 'sign-up' && getFormInput('lastName', 'Фамилия', 'Фамилията е задължителна') }
                    { getFormInput('email', 'Имейл', 'Имейлът е задължителен') }
                    { getFormInput('password', 'Парола', 'Паролата е задължителна') }

                    </Form>

                    <Button
                        type = 'primary'
                        onClick = {form.submit}
                        className = {classes.submitButton}
                    >
                        Продължи
                    </Button>
                </div>
            </div>
        </NavbarContext>
    )
}

export default AuthForm;