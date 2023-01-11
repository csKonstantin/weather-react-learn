import { emailListRegex, emailRegex } from "../utils/email"

export type FieldValidator = (val: string, msg?: string) => string;

const numberRegex = /^\d+$/

export const emailValidator: FieldValidator = (val, msg = 'Неверный адрес') => {
	if (!val) return ''

	if (!emailRegex.test(val)) return msg

	return ''
}

export const numberValidator: FieldValidator = (val, msg = 'Введите целое число') => {
	if (!val) return ''

	if (!numberRegex.test(val)) return msg

	return ''
}

export const emailListValidator: FieldValidator = (val, msg = 'Неверный адрес') => {
	if (!val) return ''

	if (!emailListRegex.test(val)) return msg

	return ''
}

export const requiredValidator: FieldValidator = (val, msg = 'Заполните поле') => {
	if (!val) return msg

	return ''
}

export const ValidatorKeyMap: Record<string, FieldValidator> = {
	required: requiredValidator,
	number: numberValidator,
	email: emailValidator,
	emailList: emailListValidator,
}
