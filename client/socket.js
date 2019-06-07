import io from 'socket.io-client';

const socket = io();

socket.on('connect', () => {

    // Choosing a nickname
    const nickNameForm = document.getElementById('nickname');
    nickNameForm.onsubmit = (e) => {
        e.preventDefault();
        const input = nickNameForm.querySelector('input');
        if (!input.value) {
            return;
        }
        socket.emit('nicknamesubmitted', input.value);
        input.value = '';
    };
    socket.on('nicknamedenied', nickname => {
        nickNameForm.querySelector('input').focus();
        alert(`Nickname ${nickname} denied`);
    });
    socket.on('nicknameconfirmed', nickname => {
        socket.nickname = nickname;
        document.getElementById('welcome').setAttribute('hidden', true);
        document.getElementById('lobby').removeAttribute('hidden');
    });
    
});

export default socket;