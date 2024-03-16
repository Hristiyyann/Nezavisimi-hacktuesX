import { Button, Form, Input } from 'antd';
import AppContext from 'contexts/AppContext';
import NavbarContext from 'contexts/NavbarContext';
import useRequest from 'hooks/useRequest';
import { useContext } from 'react';
import { useNavigate } from 'react-router';
import classes from './style.module.less';

type AuthFormProps = {
    type: 'sign-in' | 'sign-up';
}

type FormValues = {
    name?: string;
    lastName?: string;
    email: string;
    password: string;
}

type Response = {
    expiration: string;
    token: string;   
}

function AuthForm({ type }: AuthFormProps) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { setAccessToken } = useContext(AppContext);
    const { performer, changeLoading } = useRequest({ 
        url: type === 'sign-up' ? '/api/Authenticate/register' : '/api/Authenticate/login',
        method: 'post',
    });

    const getFormInput = (name: string, label: string, message: string) => (
        <Form.Item 
            {...{ name, label }}
            rules = {[{
                required: true,
                message
            }]}
        >
        {
            name === 'password' 
            ? <Input.Password/>
            : <Input/>

        }
        </Form.Item>
    );

    const handleFinish = async (values: FormValues) => {
        const data = await performer<Response>(values);
        if (!data) return;

        window.localStorage.setItem('accessToken', data.token);
        setAccessToken(data.token);
        navigate('/news');
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
                        key = {type}
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
                        loading = {changeLoading}
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