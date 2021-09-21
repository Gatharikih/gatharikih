let leaveDys = document.getElementById('leave-days-input');
let NumOfDys = document.getElementById('num-days');

let studentNameInput = document.getElementById('input-name');
let studentRegNumInput = document.getElementById('input-reg');
let studentHostelInput = document.getElementById('hostel-name-input');
let studentRoomNumInput = document.getElementById('room-number-input');

let hostelNameDiv = document.getElementById('hostel-name-div');
let hostelRoomDiv = document.getElementById('hostel-room-div');
let apartmentNameDiv = document.getElementById('apartment-name-div');
let locationDescDiv = document.getElementById('location-desc-div');

let apartmentNameInput = document.getElementById('apartment-name-input');
let describeLocationInput = document.getElementById('describe-location-textarea');
let studentMobileNumInput = document.getElementById('mobile-number-input');

let reasonsInput = document.getElementById('reasons-textarea');
let kinNameInput = document.getElementById('kin-name-input');
let kinRelationInput = document.getElementById('kin-relship-input');
let kinContactInput = document.getElementById('kin-contact-input');

let leaveForm = document.getElementById('leave-form');
let residenceRadioInput = document.querySelectorAll('input[name="residence-radio-options"]');

let alert = document.getElementById('alert');
let alertTxt = document.getElementById('alert-text');

let submitLeaveFormBtn = document.getElementById('submit-leave-form-btn');

let residence;

$(document).ready(function () {
    $('#select-affected-units').select2();

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
});

function alertNotification(state, msg = null, errmsg = null) {
    alert.classList.add('d-flex');
    alert.classList.remove('d-none');

    switch (state) {
        case 'success':
            alert.classList.add('alert-info');
            alert.classList.remove('alert-danger');

            if (msg != null) {
                alertTxt.innerHTML = msg;
            } else {
                alertTxt.innerHTML = 'Completed successfully';
            }

            break;
        case 'error':
            alert.classList.add('alert-danger');
            alert.classList.remove('alert-info');

            if (errmsg !== null) {
                alertTxt.innerHTML = errmsg;
            } else {
                alertTxt.innerHTML = 'An error occurred while processing';
            }

            break;
    }

    setTimeout(() => {
        alert.classList.remove('d-flex');
        alert.classList.add('d-none');
    }, 4000);
}

// disabling form submissions if there are invalid fields
async function checkForm(form, event, desc) {
    if (form.checkValidity() === false) {
        // invalid form
        event.preventDefault();
        event.stopPropagation();
    } else {
        // valid form
        event.preventDefault();

        switch (desc) {
            case 'leave-form':
                if (studentNameInput.value.trim() == "") {
                    studentNameInput.setCustomValidity('Provide your name');

                    event.stopPropagation();
                } else if (studentRegNumInput.value.trim() == "") {
                    studentRegNumInput.setCustomValidity('Provide your admission number');

                    event.stopPropagation();
                } else if (studentMobileNumInput.value.trim() == "") {
                    studentMobileNumInput.setCustomValidity('Provide your phone number');

                    event.stopPropagation();
                } else if (residence == 'resident') {
                    if (studentHostelInput.value.trim() == '') {
                        studentHostelInput.setCustomValidity('Provide hostel name');

                        event.stopPropagation();
                    } else if (studentRoomNumInput.value.trim() == '') {
                        studentRoomNumInput.setCustomValidity('Provide room number');

                        event.stopPropagation();
                    }
                } else if (residence == 'nonresident') {
                    if (apartmentNameInput.value.trim() == '') {
                        apartmentNameInput.setCustomValidity('Provide apartment/hostel name');

                        event.stopPropagation();
                    } else if (describeLocationInput.value.trim() == '') {
                        describeLocationInput.setCustomValidity('Describe the apartment/hostel location');

                        event.stopPropagation();
                    }
                } else if (reasonsInput.value.trim() == "") {
                    reasonsInput.setCustomValidity('Give reason(s) for being away');

                    event.stopPropagation();
                } else if (kinNameInput.value.trim() == "") {
                    kinNameInput.setCustomValidity('Provide name of your next of kin');

                    event.stopPropagation();
                } else if (kinRelationInput.value.trim() == "") {
                    kinRelationInput.setCustomValidity('Specify relationship with your next of kin');

                    event.stopPropagation();
                } else if (kinContactInput.value.trim() == "") {
                    kinContactInput.setCustomValidity('Provide contact of your next of kin');

                    event.stopPropagation();
                } else {
                    studentNameInput.setCustomValidity('');
                    studentRegNumInput.setCustomValidity('');
                    studentMobileNumInput.setCustomValidity('');

                    studentHostelInput.setCustomValidity('');
                    studentRoomNumInput.setCustomValidity('');
                    apartmentNameInput.setCustomValidity('');

                    reasonsInput.setCustomValidity('');
                    kinNameInput.setCustomValidity('');
                    kinRelationInput.setCustomValidity('');
                    kinContactInput.setCustomValidity('');

                    // $('#loading-modal').modal('show');
                }

                studentNameInput.reportValidity();
                studentRegNumInput.reportValidity();
                studentMobileNumInput.reportValidity();

                studentHostelInput.reportValidity();
                studentRoomNumInput.reportValidity();
                apartmentNameInput.reportValidity();

                reasonsInput.reportValidity();
                kinNameInput.reportValidity();
                kinRelationInput.reportValidity();
                kinContactInput.reportValidity();
                break;
            default:
                break;
        }
    }

    form.classList.add('was-validated');
}

submitLeaveFormBtn.addEventListener('click', ev => {
    // ev.preventDefault();

    checkForm(leaveForm, ev, 'leave-form');
});

residenceRadioInput.forEach(eachResidenceRadioInput => {
    eachResidenceRadioInput.addEventListener('change', ev => {
        residence = ev.target.value;

        if (residence == 'resident') {
            hostelNameDiv.classList.add('d-block');
            hostelNameDiv.classList.remove('d-none');

            hostelRoomDiv.classList.add('d-block');
            hostelRoomDiv.classList.remove('d-none');

            apartmentNameDiv.classList.add('d-none');
            apartmentNameDiv.classList.remove('d-block');

            locationDescDiv.classList.add('d-none');
            locationDescDiv.classList.remove('d-block');
        } else if (residence == 'nonresident') {
            hostelNameDiv.classList.add('d-none');
            hostelNameDiv.classList.remove('d-block');

            hostelRoomDiv.classList.add('d-none');
            hostelRoomDiv.classList.remove('d-block');

            apartmentNameDiv.classList.add('d-block');
            apartmentNameDiv.classList.remove('d-none');

            locationDescDiv.classList.add('d-block');
            locationDescDiv.classList.remove('d-none');
        } else {
            hostelNameDiv.classList.add('d-none');
            hostelNameDiv.classList.remove('d-block');

            hostelRoomDiv.classList.add('d-none');
            hostelRoomDiv.classList.remove('d-block');

            apartmentNameDiv.classList.add('d-none');
            apartmentNameDiv.classList.remove('d-block');

            locationDescDiv.classList.add('d-none');
            locationDescDiv.classList.remove('d-block');
        }
    });
});