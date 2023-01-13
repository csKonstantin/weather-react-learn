import React, { useCallback, useEffect, useState } from 'react'
import { FieldValidator, ValidatorKeyMap } from '../core/validation'

export interface FormFieldParams {
	allErrors?: boolean,
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
}

export default function useFormField (
	initialValue: string = '',
	validators: (string | string[] | FieldValidator)[] = [],
	params: FormFieldParams = {},
) {
  const [value, setValue] = useState(initialValue)
  const [error, setError] = useState(initialValue)
  const [focused, setFocused] = useState(false)
  const [errorShown, setErrorShown] = useState(false)

	const checkErrors = useCallback(
		(val: string) => {
		// TODO: allErrors optimization
		const errors = validators.map((v) => {
			if (typeof v === 'function') return v(val)

			if (typeof v === 'string') return ValidatorKeyMap[v]?.(val) || ''

			if (v.length) {
				const [key, msg] = v

				return ValidatorKeyMap[key]?.(val, msg) || ''
			}

			return ''
		}).filter(e => e)

		if (errors.length) {
			setError(params.allErrors ? errors.join(', ') : errors[0])
		} else {
			setError('')
		}
	}, [validators, params.allErrors])

	const onFocus = useCallback(() => {
		setFocused(true)
	}, [])

  const onChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const newVal = e.target.contentEditable === 'true' ?
				e.target.innerText : e.target.value

			setValue(newVal)
			checkErrors(newVal)

			if (focused) {
				setErrorShown(false)
			}

			params.onChange?.(e)
		}, [checkErrors, focused, params])

	const onBlur = useCallback(
		(e: React.FocusEvent<HTMLInputElement>) => {
			const newVal = e.target.value

			checkErrors(newVal)

			setFocused(false)
			setErrorShown(true)

			params.onBlur?.(e)
		}, [checkErrors, params])

	useEffect(
		() => {
			checkErrors(initialValue)
		},
		[initialValue], // eslint-disable-line
	)

  return { value, error, errorShown, onInput: onChange, onBlur, onFocus }
}
