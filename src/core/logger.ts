function createLogger(env: string) {
	// inject the moduleName as the first argument so we get nicely formatted log messages.
	const result = {
		debug: (...args: any[]) => console.debug(...args),
		log: (...args: any[]) => console.log(...args),
		info: (...args: any[]) => console.info(...args),
		warn: (...args: any[]) => console.warn(...args),
		error: (...args: any[]) => console.error(...args),
		temp: (...args: any[]) => console.info(...args),
	}

	if (env === 'test') {
		Object.assign(result, {
			debug: noop,
			warn: noop,
		})
	} else if (env === 'prod') {
		Object.assign(result, {
			debug: noop,
			log: noop,
			info: noop,
			warn: noop,
			temp: noop,
		})
	}

	return result
}
function noop() {}

export default createLogger(process.env.DEPLOY_ENV || process.env.NODE_ENV || 'prod')
