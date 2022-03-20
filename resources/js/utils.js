export function gqlErrors(err) {
    const hasInternal = errors => errors.some(e => e.internal);
    const replaceInternal = (errors, err) =>
        hasInternal(errors) ? errors.filter(e => !e.internal).concat(err) : errors;

    if (err?.networkError && err.networkError.statusCode === 419) {
        throw new AuthError("Unauthenticated");
    }

    return replaceInternal((err?.graphQLErrors || []).map(error => {
        if ("validation" === error.extensions?.category) {
            const validationErr = error.extensions?.validation || {};
            Object.keys(validationErr).map(key => validationErr[key]);

            return Object.keys(validationErr).map(key => validationErr[key]).flat().map(v => ({
                message: v,
                internal: false
            }));
        }

        return {
            message: error.message,
            internal: Boolean(!(error?.path?.length))
        }
    }), {
        message: 'Something bad happened'
    }).flat();
}

export class AuthError extends Error {

}

export const colorMainBoard = {
    teal: "bg-teal-100",
    orange: "bg-orange-100",
    gray: "bg-gray-100",
    yellow: "bg-yellow-100",
    purple: "bg-purple-100",
    red: "bg-red-100",
    green: "bg-green-100",
    blue: "bg-blue-100",
    indigo: "bg-indigo-100",
    white: "bg-white"
}

export const colorSidebar = {
    teal: "bg-teal-200",
    orange: "bg-orange-200",
    gray: "bg-gray-200",
    yellow: "bg-yellow-200",
    purple: "bg-purple-200",
    red: "bg-red-200",
    green: "bg-green-200",
    blue: "bg-blue-200",
    indigo: "bg-indigo-200",
    white: "bg-gray-100"
}

export const colorBorder = {
    teal: "border-teal-400",
    orange: "border-orange-400",
    gray: "border-gray-400",
    yellow: "border-yellow-400",
    purple: "border-purple-400",
    red: "border-red-400",
    green: "border-green-400",
    blue: "border-blue-400",
    indigo: "border-indigo-400",
    white: "border-gray-300"
}

export const buttonColor = {
    teal: "bg-teal-800",
    orange: "bg-orange-800",
    gray: "bg-gray-800",
    yellow: "bg-yellow-800",
    purple: "bg-purple-800",
    red: "bg-red-800",
    green: "bg-green-800",
    blue: "bg-blue-800",
    indigo: "bg-indigo-800",
    white: "bg-gray-800"
}

export const buttonColorHover = {
    teal: "hover:bg-teal-700",
    orange: "hover:bg-orange-700",
    gray: "hover:bg-gray-700",
    yellow: "hover:bg-yellow-700",
    purple: "hover:bg-purple-700",
    red: "hover:bg-red-700",
    green: "hover:bg-green-700",
    blue: "hover:bg-blue-700",
    indigo: "hover:bg-indigo-700",
    white: "hover:bg-gray-700"
}

export const textColor = {
    teal: "text-white",
    orange: "text-white",
    gray: "text-white",
    yellow: "text-white",
    purple: "text-white",
    red: "text-white",
    green: "text-white",
    blue: "text-white",
    indigo: "text-white",
    white: "text-gray-700"
}

export const circleBorderColor = {
    teal: "border-white",
    orange: "border-white",
    gray: "border-white",
    yellow: "border-white",
    purple: "border-white",
    red: "border-white",
    green: "border-white",
    blue: "border-white",
    indigo: "border-white",
    white: "border-gray-700"
}


