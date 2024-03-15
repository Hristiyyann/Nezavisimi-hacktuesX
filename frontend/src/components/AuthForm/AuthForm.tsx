import { Button, Form, Input } from 'antd';
import classes from './style.module.less';

type AuthFormProps = {
    type: 'sign-in' | 'sign-up';
}

function AuthForm({ type }: AuthFormProps) {
    const [form] = Form.useForm();

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
    )

    const handleFinish = (values: any) => {
        console.log(values)
    }

    return (
        <div className = {classes.formContainer}>
            <Form
                form = {form}
                layout = 'vertical'
                style = {{ width: 350 }}
                onFinish = {handleFinish}
                requiredMark = {false}
            >
            { type === 'sign-up' && getFormInput('name', 'Име', 'Името е задължително') }
            { type === 'sign-up' && getFormInput('lastName', 'Фамилия', 'Фамилията е задължителна') }
            { getFormInput('email', 'Имейл', 'Имейлът е задължителен') }
            { getFormInput('password', 'Парола', 'Паролата е задължителна') }

                <Button
                    onClick = {form.submit}
                    className = {classes.formButton}
                >
                {
                    type === 'sign-up'
                    ? 'Регистрирай се'
                    : 'Вход'
                }
                </Button>
            </Form>
        </div>
    )
}

export default AuthForm;