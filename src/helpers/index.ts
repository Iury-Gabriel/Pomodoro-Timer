export const notificarPomodoro = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('Pomodoro concluído!', {
                    body: 'Seu tempo de Pomodoro terminou. Hora de fazer uma pausa!',
                });
            }
        });
    }
};

export const notificarBreak = () => {
    if ('Notification' in window) {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                new Notification('Pausa concluído!', {
                    body: 'Seu tempo de pausa terminou. Hora de voltar para o Pomodoro',
                });
            }
        });
    }
};