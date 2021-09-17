let leaveDys = document.getElementById('leave-days-input');
let NumOfDys = document.getElementById('num-days');

$('input[name="daterange"]').daterangepicker({
    opens: 'left',
    drops: 'up'

}, function (start, end, label) {
    let startDate = start.format('DD/MM/YYYY');
    let endDate = end.format('DD/MM/YYYY');

    leaveDys.setAttribute('value', startDate + '-' + endDate);

    let numOfDays = end.diff(start, 'days');
    // TODO: max days - 5 - https://select2.org/data-sources/ajax
    NumOfDys.innerHTML = numOfDays;
});