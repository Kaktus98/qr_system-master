  export const setUser = ({id, role}) => {
    return {
        type: "SET_USER",
        id: id,
        role: role,
    }
}

export const resetUser = () => {
    return {
        type: "RESET_USER"
    }
}