import { registerOrgDataType, registerUserDataType } from "@/types"

const validateEmail = (email: string | null) => {
    return email
        ?
        email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ) !== null
        :
        false
}

const validatePassword = (password: string | null) => {
    return String(password).length >= 8
}

const validateConfirmPassword = (password: string, confirmPassword: string) => {
    return String(password) === String(confirmPassword)
}

const validateCurrentAndNewPassword = (currentPassword: string, newPassword: string) => {
    return String(currentPassword) !== String(newPassword)
}


const validateRegisterUserForm = (userData: registerUserDataType) => {
    return Boolean(validateEmail(userData.userEmail) && validatePassword(userData.password) && userData.firstName && userData.lastName)

}

const validateRegisterOrgForm = (orgData: registerOrgDataType) => {
    return Boolean(orgData.orgName && orgData.position && orgData.identifier && orgData.countryCode && orgData.currency && orgData.orgLocalization && orgData.companySize)
}


export { validateEmail, validatePassword, validateConfirmPassword, validateCurrentAndNewPassword, validateRegisterUserForm, validateRegisterOrgForm }