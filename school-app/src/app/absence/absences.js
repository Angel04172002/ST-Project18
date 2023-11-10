document.getElementById('absence-form').addEventListener('submit', function (event) {
    event.preventDefault();
    var date = document.getElementById('date').value;
    var excused = document.getElementById('excused').checked;
    var reason = document.getElementById('reason').value;

    if (excused) {
        console.log('Отсъствието на ' + date + ' е извинено.');
    } else {
        console.log('Отсъствието на ' + date + ' не е извинено. Причина: ' + reason);
    }
});