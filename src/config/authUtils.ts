/* Modal para mostrar mensagem - Retirado da Internet e boa!!!*/
export function getAuthToken(): string | null {
    return localStorage.getItem('token');
}
