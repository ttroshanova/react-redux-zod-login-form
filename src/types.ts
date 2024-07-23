import { z } from 'zod'
import { store } from './app/store'

export const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&#^]{8,}$/)

export const signInSchema = z.object({
    username: z.string()
    .min(1, 'Username is required'),
    password: z.string()
    .min(8, 'Password must contain at least 8 characters')
    .regex(passwordPattern, {
        message: 'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character'
    })
})
export type TSignInSchema = z.infer<typeof signInSchema>

export type BodyData = {
    Name: string,
    Mass: string,
    Height: string,
    'Hair color': string,
    'Skin color': string
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;