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
    emerald: "bg-emerald-100",
    lime: "bg-lime-100",
    sky: "bg-sky-100",
    violet: "bg-violet-100",
    slate: "bg-slate-100",
    rose: "bg-rose-100",
    stone: "bg-stone-100",
    white: "bg-white"
}

export const colorBorder = {
    teal: "border-teal-200",
    orange: "border-orange-200",
    gray: "border-gray-200",
    yellow: "border-yellow-200",
    purple: "border-purple-200",
    red: "border-red-200",
    green: "border-green-200",
    blue: "border-blue-200",
    indigo: "border-indigo-200",
    emerald: "border-emerald-200",
    lime: "border-lime-200",
    sky: "border-sky-200",
    violet: "border-violet-200",
    slate: "border-slate-200",
    rose: "border-rose-200",
    stone: "border-stone-200",
    white: "border-gray-200"
}

export const buttonFocusColor = {
    teal: "focus:ring-teal-500",
    orange: "focus:ring-orange-500",
    gray: "focus:ring-gray-500",
    yellow: "focus:ring-yellow-500",
    purple: "focus:ring-purple-500",
    red: "focus:ring-red-500",
    green: "focus:ring-green-500",
    blue: "focus:ring-blue-500",
    indigo: "focus:ring-indigo-500",
    emerald: "focus:ring-emerald-500",
    lime: "focus:ring-lime-500",
    sky: "focus:ring-sky-500",
    violet: "focus:ring-violet-500",
    slate: "focus:ring-slate-500",
    rose: "focus:ring-rose-500",
    stone: "focus:ring-stone-500",
    white: "focus:ring-gray-500"
}

export const buttonHoverColor = {
    teal: "hover:bg-teal-50",
    orange: "hover:bg-orange-50",
    gray: "hover:bg-gray-50",
    yellow: "hover:bg-yellow-50",
    purple: "hover:bg-purple-50",
    red: "hover:bg-red-50",
    green: "hover:bg-green-50",
    blue: "hover:bg-blue-50",
    indigo: "hover:bg-indigo-50",
    emerald: "hover:bg-emerald-50",
    lime: "hover:bg-lime-50",
    sky: "hover:bg-sky-50",
    violet: "hover:bg-violet-50",
    slate: "hover:bg-slate-50",
    rose: "hover:bg-rose-50",
    stone: "hover:bg-stone-50",
    white: "hover:bg-gray-50"
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
    emerald: "text-white",
    lime: "text-white",
    sky: "text-white",
    violet: "text-white",
    slate: "text-white",
    rose: "text-white",
    stone: "text-white",
    white: "text-gray-500"
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
    emerald: "border-white",
    lime: "border-white",
    sky: "border-white",
    violet: "border-white",
    slate: "border-white",
    rose: "border-white",
    stone: "border-white",
    white: "border-gray-300"
}

export const hexValues = {
    "#1FBC9C": "emerald",
    "#1CA085": "teal",
    "#2ECC70": "lime",
    "#27AF60": "green",
    "#3398DB": "sky",
    "#2980B9": "blue",
    "#A463BF": "violet",
    "#8E43AD": "purple",
    "#3D556E": "gray",
    "#222F3D": "slate",
    "#F2C511": "yellow",
    "#F39C19": "orange",
    "#E84B3C": "red",
    "#C0382B": "rose",
    "#DDE6E8": "white",
    "#BDC3C8": "stone"
}
