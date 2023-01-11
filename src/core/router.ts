import { createBrowserHistory } from 'history'

// Create history singleton
const history = createBrowserHistory<{ returnPath?: string }>()

export const routerGoBack = () => {
	if (history.location.state?.returnPath) {
		history.push(history.location.state?.returnPath)
	} else {
		history.goBack()
	}
}

export default history
