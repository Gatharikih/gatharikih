let mainDashboardDiv = document.getElementById('main-dashboard-div');
let loginDiv = document.getElementById('login-div');

let titleDiv = document.getElementById('title-div');
let applyForLeaveBtn = document.getElementById('apply-for-leave-btn');

let dashboardDiv = document.getElementById('dashboard-div');
let leaveDiv = document.getElementById('leave-div');
let leaveToApproveDiv = document.getElementById('leave-to-approve-div');
let reportsDiv = document.getElementById('reports-div');
let settingsDiv = document.getElementById('settings-div');

let dashboardBtn = document.getElementById('dashboard-btn');
let leaveBtn = document.getElementById('leave-btn');
let leaveToApproveBtn = document.getElementById('leave-to-approve-btn');
let reportsBtn = document.getElementById('reports-btn');
let settingsBtn = document.getElementById('settings-btn');

let leaveDysInput = document.getElementById('leave-days-input');
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
let obligationsDiv = document.getElementById('obligations-div');
let residenceRadioInput = document.querySelectorAll('input[name="residence-radio-options"]');

let alert = document.getElementById('alert');
let alertTxt = document.getElementById('alert-text');

let addUnitBtn = document.getElementById('addunit-btn');
let plusSVG = document.getElementById('plus-svg');
let addTxt = document.getElementById('addtxt');

let schoolSelectInput = document.getElementById('input-sch-select');
let deptSelectInput = document.getElementById('input-dept-select');

let submitLeaveFormBtn = document.getElementById('submit-leave-form-btn');

let xmlns = "http://www.w3.org/2000/svg";

let residence;
let startDate, endDate;

let unitsData = [
    { id: 'pro954', text: 'Introduction to Programming' },
    { id: 'sta234', text: 'Principles of Statistics' },
    { id: 'alg064', text: ' Linear Algebra' },
    { id: 'sta586', text: 'Probability and Statistics' },
    { id: 'swe295', text: 'Software Engineering II' }
];

// all departments object
let allDepts = {
    dept_agri: [
        { id: 'arm', text: 'Agricultural Resources & Management' },
        { id: 'lwm', text: 'Land & Water Management' },
        { id: 'aee', text: 'Agricultural Economics & Extension' }
    ],
    dept_pas: [
        { id: 'mcit', text: 'Mathematics, Computing & IT' },
        { id: 'ps', text: 'Physical Sciences' },
        { id: 'bis', text: 'Biological Sciences' }
    ],
    dept_bus: [
        { id: 'bse', text: 'Business & Economics' }
    ],
    dept_nur: [
        { id: 'nur', text: 'Nursing' }
    ],
    dept_ess: [
        { id: 'edu', text: 'Education' },
        { id: 'hum', text: 'Humanities' }
    ],
    dept_law: [
        { id: 'law', text: 'Law' }
    ],
    dept_default: [
        { id: 'def', text: 'Choose your school' }
    ]
}

$(document).ready(function () {
    $('#input-dept-select').select2({
        data: allDepts.dept_default
    });

    $('input[name="daterange"]').daterangepicker({
        opens: 'left',
        drops: 'up'
    }, function (start, end, label) {
        startDate = start.format('DD/MM/YYYY');
        endDate = end.format('DD/MM/YYYY');

        leaveDysInput.setAttribute('value', startDate + '-' + endDate);

        let numOfDays = end.diff(start, 'days');
        // TODO: max days - 5 - https://select2.org/data-sources/ajax
        NumOfDys.innerHTML = numOfDays;
    });
});

function timeOut(contr) {
    // 15s timeout
    let timeoutPromise = new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            clearTimeout(timeout);
            contr.abort();
            resolve(555);
        }, 15000);
    });

    return timeoutPromise;
}

function fetchData(url, options) {
    let data = fetch(url, options);

    return data;
}

function race(fetchPromise, timeoutPromise) {
    let racePromise = Promise.race([fetchPromise, timeoutPromise]);

    return racePromise;
}

// alert function
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

// change color of active and inactive sidebar buttons
function activateSidebarBtn(ev) {
    let allAnchorEl = document.querySelectorAll('.nav-link');

    allAnchorEl.forEach(eachNavLinkEl => {
        eachNavLinkEl.classList.remove('active');
    });

    let anchorEl = document.querySelector(`#${ev.target.id} > *`);
    anchorEl.classList.add('active');
}

// create a random identifier
function create_UUID() {
    let dt = new Date().getTime();
    let uuid = 'xxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

// create academic obligations UI
function addAcademicObligation() {
    let unitId = create_UUID();

    let formRowDiv = document.createElement('div');
    formRowDiv.setAttribute('id', unitId + '_form-row');
    formRowDiv.setAttribute('class', 'form-row mb-3 float-left');

    let formRowDivCol1 = document.createElement('div');
    formRowDivCol1.setAttribute('class', 'col-md-12 px-3 py-3 shadow rounded');

    let formRowDivCol1Input = document.createElement('select');
    formRowDivCol1Input.setAttribute('id', unitId + '_select');
    formRowDivCol1Input.setAttribute('class', 'form-select p-1 select-affected-units w-100');
    // formRowDivCol1Input.setAttribute('style', 'width: 100%');

    let formRowDivCol1Div = document.createElement('div');
    formRowDivCol1Div.setAttribute('class', 'invalid-feedback');
    formRowDivCol1Div.innerHTML = 'Please provide a unit';

    let formRowDivCol2FormCheck_Lecture = document.createElement('div');
    formRowDivCol2FormCheck_Lecture.setAttribute('class', 'form-check form-check-inline');

    let formRowDivCol2FormCheck_CAT = document.createElement('div');
    formRowDivCol2FormCheck_CAT.setAttribute('class', 'form-check form-check-inline');

    let formRowDivCol2FormCheck_Exam = document.createElement('div');
    formRowDivCol2FormCheck_Exam.setAttribute('class', 'form-check form-check-inline');

    let formRowDivCol2Checkbox_Lecture_Input = document.createElement('input');
    formRowDivCol2Checkbox_Lecture_Input.setAttribute('id', unitId + '_lecturer-checkbox');
    formRowDivCol2Checkbox_Lecture_Input.setAttribute('type', 'checkbox');
    formRowDivCol2Checkbox_Lecture_Input.setAttribute('class', 'form-check-input ml-4 lecture-checkbox');
    formRowDivCol2Checkbox_Lecture_Input.setAttribute('value', 'lecture');

    let formRowDivCol2Checkbox_LectureLabel = document.createElement('label');
    formRowDivCol2Checkbox_LectureLabel.setAttribute('for', unitId + '_lecturer-checkbox');
    formRowDivCol2Checkbox_LectureLabel.setAttribute('class', 'form-check-label');
    formRowDivCol2Checkbox_LectureLabel.innerHTML = 'Lecture';

    let formRowDivCol2Checkbox_CAT_Input = document.createElement('input');
    formRowDivCol2Checkbox_CAT_Input.setAttribute('id', unitId + '_cat-checkbox');
    formRowDivCol2Checkbox_CAT_Input.setAttribute('type', 'checkbox');
    formRowDivCol2Checkbox_CAT_Input.setAttribute('class', 'form-check-input');
    formRowDivCol2Checkbox_CAT_Input.setAttribute('value', 'cat');

    let formRowDivCol2Checkbox_CATLabel = document.createElement('label');
    formRowDivCol2Checkbox_CATLabel.setAttribute('for', unitId + '_cat-checkbox');
    formRowDivCol2Checkbox_CATLabel.setAttribute('class', 'form-check-label');
    formRowDivCol2Checkbox_CATLabel.innerHTML = 'CAT';

    let formRowDivCol2Checkbox_Exam_Input = document.createElement('input');
    formRowDivCol2Checkbox_Exam_Input.setAttribute('id', unitId + '_exam-checkbox');
    formRowDivCol2Checkbox_Exam_Input.setAttribute('type', 'checkbox');
    formRowDivCol2Checkbox_Exam_Input.setAttribute('class', 'form-check-input');
    formRowDivCol2Checkbox_Exam_Input.setAttribute('value', 'exam');

    let formRowDivCol2Checkbox_ExamLabel = document.createElement('label');
    formRowDivCol2Checkbox_ExamLabel.setAttribute('for', unitId + '_exam-checkbox');
    formRowDivCol2Checkbox_ExamLabel.setAttribute('class', 'form-check-label');
    formRowDivCol2Checkbox_ExamLabel.innerHTML = 'Exam';

    formRowDivCol2FormCheck_Lecture.appendChild(formRowDivCol2Checkbox_Lecture_Input);
    formRowDivCol2FormCheck_Lecture.appendChild(formRowDivCol2Checkbox_LectureLabel);

    formRowDivCol2FormCheck_CAT.appendChild(formRowDivCol2Checkbox_CAT_Input);
    formRowDivCol2FormCheck_CAT.appendChild(formRowDivCol2Checkbox_CATLabel);

    formRowDivCol2FormCheck_Exam.appendChild(formRowDivCol2Checkbox_Exam_Input);
    formRowDivCol2FormCheck_Exam.appendChild(formRowDivCol2Checkbox_ExamLabel);

    //delete svg
    let deleteSVG = document.createElementNS(xmlns, 'svg');
    deleteSVG.setAttribute('viewBox', '0 0 16 16');
    deleteSVG.setAttribute('class', 'bi trash vertical-align pointer ml-5');
    deleteSVG.setAttribute('fill', 'currentColor');

    let path = document.createElementNS(xmlns, 'path');
    path.setAttribute('d', 'M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z');

    let path2 = document.createElementNS(xmlns, 'path');
    path2.setAttribute('d', 'M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z');

    deleteSVG.appendChild(path);
    deleteSVG.appendChild(path2);

    formRowDivCol1.appendChild(formRowDivCol1Input);
    formRowDivCol1.appendChild(formRowDivCol1Div);
    formRowDivCol1.appendChild(formRowDivCol2FormCheck_Lecture);
    formRowDivCol1.appendChild(formRowDivCol2FormCheck_CAT);
    formRowDivCol1.appendChild(formRowDivCol2FormCheck_Exam);
    formRowDivCol1.appendChild(deleteSVG);

    formRowDiv.appendChild(formRowDivCol1);

    obligationsDiv.appendChild(formRowDiv);

    // delete email field
    if (deleteSVG != null) {
        deleteSVG.addEventListener('click', (e) => {
            let unitInputFieldToDel = e.target.parentNode.parentNode.parentNode.lastChild;

            unitInputFieldToDel.remove();
        });
    }

    $('.select-affected-units').select2({
        data: unitsData
    });
}

// display corresponding div respective to the sidebar button clicked
function displayFunc(desc) {
    switch (desc) {
        case 'dashboard':
            titleDiv.innerHTML = 'Dashboard';
            break;
        case 'leave':
            titleDiv.innerHTML = 'Leave';
            break;
        case 'leave-to-approve':
            titleDiv.innerHTML = 'Leaves to approve';
            break;
        case 'reports':
            titleDiv.innerHTML = 'Reports';
            break;
        case 'settings':
            titleDiv.innerHTML = 'Settings';
            break;
        default:
            titleDiv.innerHTML = 'Dashboard';
            break;
    }
}

function submitLeaveData(studentdata, leavedata) {
    let obligationsDiv_child_nodes = document.querySelectorAll('#obligations-div > *');

    let obligationsObjArray = [];
    let leaveDataObj = {};
    let controller = new AbortController();

    obligationsDiv_child_nodes.forEach(eachObligationChildNode => {
        let obligationObj = {};

        let eachObligationChildNodeId = eachObligationChildNode.id;
        let id = eachObligationChildNodeId.split('_')[0];

        let selectEl = document.getElementById(id + '_select');
        let lectureCheckbox = document.getElementById(id + '_lecturer-checkbox');
        let catCheckbox = document.getElementById(id + '_cat-checkbox');
        let examCheckbox = document.getElementById(id + '_exam-checkbox');

        if (selectEl != null) {
            let unitSelected = document.querySelector('#' + id + '_select' + ' option:checked');
            obligationObj.unitname = unitSelected.textContent;
        }

        // lecture
        if (lectureCheckbox.checked && lectureCheckbox != null) {
            obligationObj.lecture = 1;
        } else {
            obligationObj.lecture = 0;
        }

        // CAT
        if (catCheckbox.checked && catCheckbox != null) {
            obligationObj.cat = 1;
        } else {
            obligationObj.cat = 0;
        }

        // exam
        if (examCheckbox.checked && examCheckbox != null) {
            obligationObj.exam = 1;
        } else {
            obligationObj.exam = 0;
        }

        obligationsObjArray.push(obligationObj);
    });

    leaveDataObj.obligations_array_data = obligationsObjArray;
    leaveDataObj.studentdata = studentdata;
    leaveDataObj.leavedata = leavedata;

    console.log(leaveDataObj);

    let createLeavePromise = fetchData('https://odl.embuni.ac.ke:3800/create/leave', {
        method: 'POST',
        headers: {
            // 'Authorization': 'Bearer ' + localStorage.getItem('x_Tkn'),
            'Content-Type': 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify(leaveDataObj)
    });

    let timeoutPr = timeOut(controller);

    race(createLeavePromise, timeoutPr).then(async result => {
        let status = result.status;

        if (status == 200 || status == 304) {
            let leaveResult = await result.json();

            console.log(leaveResult);
        } else if (status === 555) {
            alertNotification('error', 'Timeout. Check your network connectivity.');
            return;
        } else if (status === 403 || status === 401) {
            signOutFunc();
        } else {
            alertNotification('error', 'Something went wrong.');
            return;
        }
    }).catch(error => {
        console.log(error)
        alertNotification('error', 'Request timeout');
    }).finally(() => {
        $('#loading-modal').modal('hide');
    });
}

// disabling form submissions if there are invalid fields
async function checkForm(form, event, desc) {
    // valid form
    event.preventDefault();

    let schoolSelected = document.querySelector('#input-sch-select option:checked');
    let deptSelected = document.querySelector('#input-dept-select option:checked');

    switch (desc) {
        case 'leave-form':
            if (studentNameInput.value.trim() == "") {
                console.log('ok1');
                studentNameInput.setCustomValidity('Provide your name');

                event.stopPropagation();
            } else if (studentRegNumInput.value.trim() == "") {
                console.log('ok2');
                studentRegNumInput.setCustomValidity('Provide your admission number');

                event.stopPropagation();
            } else if (studentMobileNumInput.value.trim() == "") {
                console.log('ok3');
                studentMobileNumInput.setCustomValidity('Provide your phone number');

                event.stopPropagation();
            }
            else if (residence == 'resident' && studentHostelInput.value.trim() == '') {
                console.log('ok5');
                studentHostelInput.setCustomValidity('Provide hostel name');

                event.stopPropagation();
            } else if (residence == 'resident' && studentRoomNumInput.value.trim() == '') {
                console.log('ok7');
                studentRoomNumInput.setCustomValidity('Provide room number');

                event.stopPropagation();
            } else if (residence == 'nonresident' && apartmentNameInput.value.trim() == '') {
                console.log('ok8');
                apartmentNameInput.setCustomValidity('Provide apartment/hostel name');

                event.stopPropagation();
            } else if (residence == 'nonresident' && describeLocationInput.value.trim() == '') {
                console.log('ok9');
                describeLocationInput.setCustomValidity('Describe the apartment/hostel location');

                event.stopPropagation();
            }
            else if (reasonsInput.value.trim() == "") {
                console.log('ok10');
                reasonsInput.setCustomValidity('Give reason(s) for being away');

                event.stopPropagation();
            } else if (kinNameInput.value.trim() == "") {
                console.log('ok11');
                kinNameInput.setCustomValidity('Provide name of your next of kin');

                event.stopPropagation();
            } else if (kinRelationInput.value.trim() == "") {
                console.log('ok12');
                kinRelationInput.setCustomValidity('Specify relationship with your next of kin');

                event.stopPropagation();
            } else if (kinContactInput.value.trim() == "") {
                console.log('ok13');
                kinContactInput.setCustomValidity('Provide contact of your next of kin');

                event.stopPropagation();
            } else if (schoolSelected.value == 'def') {
                console.log('ok14');
                schoolSelectInput.setCustomValidity('Select your school');

                event.stopPropagation();
            } else if (deptSelected.value == 'def') {
                console.log('ok15');
                deptSelectInput.setCustomValidity('Select your department');

                event.stopPropagation();
            } else if (startDate == undefined || endDate == undefined) {
                console.log('ok18');
                leaveDysInput.setCustomValidity('Select appropriate dates');

                event.stopPropagation();
            } else {
                console.log('ok16');

                studentNameInput.setCustomValidity('');
                studentRegNumInput.setCustomValidity('');
                studentMobileNumInput.setCustomValidity('');

                schoolSelectInput.setCustomValidity('');
                deptSelectInput.setCustomValidity('');

                studentHostelInput.setCustomValidity('');
                studentRoomNumInput.setCustomValidity('');
                apartmentNameInput.setCustomValidity('');
                describeLocationInput.setCustomValidity('');

                reasonsInput.setCustomValidity('');
                kinNameInput.setCustomValidity('');
                kinRelationInput.setCustomValidity('');
                kinContactInput.setCustomValidity('');

                leaveDysInput.setCustomValidity('');

                $('#loading-modal').modal('show');

                let studentObj = {};
                let leaveObj = {};

                studentObj.fullname = studentNameInput.value.trim();
                studentObj.reg_no = studentRegNumInput.value.trim();
                studentObj.school = schoolSelected.textContent;
                studentObj.dept = deptSelected.textContent;
                studentObj.residence = residence;
                studentObj.mobile_no = studentMobileNumInput.value.trim();
                studentObj.reasons = reasonsInput.value.trim();
                studentObj.kin_name = kinNameInput.value.trim();
                studentObj.kin_relation = kinRelationInput.value.trim();
                studentObj.kin_contact = kinContactInput.value.trim();

                leaveObj.start_date = startDate;
                leaveObj.end_date = endDate;

                submitLeaveData(studentObj, leaveObj);
            }

            studentNameInput.reportValidity();
            studentRegNumInput.reportValidity();
            studentMobileNumInput.reportValidity();

            schoolSelectInput.reportValidity();
            deptSelectInput.reportValidity();

            studentHostelInput.reportValidity();
            studentRoomNumInput.reportValidity();
            apartmentNameInput.reportValidity();
            describeLocationInput.reportValidity();

            reasonsInput.reportValidity();
            kinNameInput.reportValidity();
            kinRelationInput.reportValidity();
            kinContactInput.reportValidity();

            leaveDysInput.reportValidity();
            break;
        default:
            console.log('default');
            break;
    }


    form.classList.add('was-validated');
}

submitLeaveFormBtn.addEventListener('click', ev => {
    console.log(ev.target);

    checkForm(leaveForm, ev, 'leave-form');
});

// add animations to the add academic obligations button on mouse hover
addUnitBtn.addEventListener('mouseover', () => {
    plusSVG.classList.add('rotate');
    plusSVG.classList.remove('ml-3');

    addTxt.classList.add('slide-in-left');
    // addTxt.classList.add('slide-in-left-reverse');
    addTxt.classList.add('d-inline-block');
    addTxt.classList.remove('d-none');
});

// add animations to the add academic obligations button on mouse hover exit
addUnitBtn.addEventListener('mouseout', () => {
    plusSVG.classList.remove('rotate');
    plusSVG.classList.add('ml-3');

    addTxt.classList.remove('slide-in-left');
    // addTxt.classList.add('slide-in-left-reverse');
    addTxt.classList.add('d-none');
    addTxt.classList.remove('d-inline-block');
});

addUnitBtn.addEventListener('click', () => {
    addAcademicObligation();
});

schoolSelectInput.addEventListener('change', ev => {
    console.log(ev.target.value);

    let inputDeptSelect = document.getElementById('input-dept-select');

    while (inputDeptSelect.firstChild) {
        inputDeptSelect.removeChild(inputDeptSelect.firstChild);
    }

    switch (ev.target.value) {
        case 'Agriculture':
            $('#input-dept-select').select2({
                data: allDepts.dept_agri
            });
            break;
        case 'Pure & Applied Sciences':
            $('#input-dept-select').select2({
                data: allDepts.dept_pas
            });
            break;
        case 'Business & Economics':
            $('#input-dept-select').select2({
                data: allDepts.dept_bus
            });
            break;
        case 'Nursing':
            $('#input-dept-select').select2({
                data: allDepts.dept_nur
            });
            break;
        case 'Education & Social Sciences':
            $('#input-dept-select').select2({
                data: allDepts.dept_ess
            });
            break;
        case 'Law':
            $('#input-dept-select').select2({
                data: allDepts.dept_law
            });
            break;
        default:
            $('#input-dept-select').select2({
                data: allDepts.dept_default
            });
            break;
    }
});

residenceRadioInput.forEach(eachResidenceRadioInput => {
    eachResidenceRadioInput.addEventListener('change', ev => {
        residence = ev.target.value || ev.target.textContent;

        if (residence == 'resident') {
            hostelNameDiv.classList.add('d-block');
            hostelNameDiv.classList.remove('d-none');

            hostelRoomDiv.classList.add('d-block');
            hostelRoomDiv.classList.remove('d-none');

            apartmentNameDiv.classList.add('d-none');
            apartmentNameDiv.classList.remove('d-block');

            locationDescDiv.classList.add('d-none');
            locationDescDiv.classList.remove('d-block');

            studentHostelInput.setAttribute('required', '');
            studentRoomNumInput.setAttribute('required', '');

            apartmentNameInput.removeAttribute('required');
            describeLocationInput.removeAttribute('required');
        } else if (residence == 'nonresident') {
            hostelNameDiv.classList.add('d-none');
            hostelNameDiv.classList.remove('d-block');

            hostelRoomDiv.classList.add('d-none');
            hostelRoomDiv.classList.remove('d-block');

            apartmentNameDiv.classList.add('d-block');
            apartmentNameDiv.classList.remove('d-none');

            locationDescDiv.classList.add('d-block');
            locationDescDiv.classList.remove('d-none');

            studentHostelInput.removeAttribute('required');
            studentRoomNumInput.removeAttribute('required');

            apartmentNameInput.setAttribute('required', '');
            describeLocationInput.setAttribute('required', '');
        } else {
            hostelNameDiv.classList.add('d-none');
            hostelNameDiv.classList.remove('d-block');

            hostelRoomDiv.classList.add('d-none');
            hostelRoomDiv.classList.remove('d-block');

            apartmentNameDiv.classList.add('d-none');
            apartmentNameDiv.classList.remove('d-block');

            locationDescDiv.classList.add('d-none');
            locationDescDiv.classList.remove('d-block');

            studentHostelInput.setAttribute('required', '');
            studentRoomNumInput.setAttribute('required', '');

            apartmentNameInput.setAttribute('required', '');
            describeLocationInput.setAttribute('required', '');
        }
    });
});

dashboardBtn.addEventListener('click', ev => {
    activateSidebarBtn(ev);
    displayFunc('dashboard');
});

leaveBtn.addEventListener('click', ev => {
    activateSidebarBtn(ev);
    displayFunc('leave');
});

leaveToApproveBtn.addEventListener('click', ev => {
    activateSidebarBtn(ev);
    displayFunc('leave-to-approve');
});

reportsBtn.addEventListener('click', ev => {
    activateSidebarBtn(ev);
    displayFunc('reports');
});

settingsBtn.addEventListener('click', ev => {
    activateSidebarBtn(ev);
    displayFunc('settings');
});

applyForLeaveBtn.addEventListener('click', () => {
    $('#leave-form-modal').modal('show');
});