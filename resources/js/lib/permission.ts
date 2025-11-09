export function can(permission: string, userPermissions: string[]): boolean {
    return userPermissions.includes(permission);
}

export function canAny(permissions: string[], userPermissions: string[]): boolean {
    return permissions.some((p) => userPermissions.includes(p));
}

export function canAll(permissions: string[], userPermissions: string[]): boolean {
    return permissions.every((p) => userPermissions.includes(p));
}