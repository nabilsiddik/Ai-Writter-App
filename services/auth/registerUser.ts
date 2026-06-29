'use server'
import { zodValidator } from '@/lib/zodValidator';
import { registerUserZodSchema } from '@/zod/auth.zodSchema';
import { serverFetch } from '@/lib/serverFetch';
import { userLogin } from './userLogin';

export const registerUser = async (_currentState: any, data: any): Promise<any> => {
    try {
        const payload = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        };

        if (zodValidator(payload, registerUserZodSchema).success === false) {
            return zodValidator(payload, registerUserZodSchema);
        }

        const validatedPayload: any = zodValidator(payload, registerUserZodSchema)?.data;

        const registerData = {
            fullName: validatedPayload.fullName,
            email: validatedPayload.email,
            password: validatedPayload.password,
        }

        const newFormData = new FormData()
        newFormData.append('data', JSON.stringify(registerData))

        const res = await serverFetch.post('/user/register', {
            body: newFormData
        })

        const result = await res.json()

        // if (result?.success) {
        //     await userLogin({
        //         email: registerData?.email,
        //         password: registerData?.password
        //     });
        // }

        return result

    } catch (error: any) {
        if (error?.digest?.startsWith('NEXT_REDIRECT')) {
            throw error
        }
        return { success: false, message: `${process.env.NODE_ENV === 'development' ? error.message : "Registration Failed. Please try again."}` };
    }
}