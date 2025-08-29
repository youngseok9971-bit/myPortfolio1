/*var listNo = 0;
function addTask() {    // 추가
    const trEl = $("<tr>");
    let task = $("#taskInput").val();
    
    if(task == "")  {
        alert("할일을 입력해주세요.");
        $("taskInput").focus();
        return;
    }

    let html = `<td class="align-center">${++listNo}</td><td "table").appendChild(trEl);
    taskInputEl.value = "";onclick="drawline(this)">${task}</td><td class="align-center"><input type="checkbox"></td>`
    trEl.html(html);
    $("table").append(trEl);
    $("#taskInput").val("");
}

function delTask() {    // 삭제
    $("td > [type='checkbox']").each(function() {
        if($(this).is(":checked")) {
            $(this).closest("tr").remove();
        }
    });
    $("th > [type='checkbox']").prop("checked", false);
}

function allCheck(ckbx) {   // 전체선택
    let check = ckbx.checked;

    $("td > [type='checkbox']").each(function() {
        $(this).prop("checked", check);
    });
}

function inputKey(e) {  // 엔터키 눌렀을때 추가
    if(e.key == "Enter") addTask();
}

function drawline(tdEl) { // 할일했는지 체크용
    $(tdEl).toggleClass("through-line")
//    tdEl.classList.toggle("through-line")
}*/

var num = 0;

// 추가버튼 눌러서 게시물 올리기
function addBoard() {       
    const titleEl = $("#titleInput");
    const contentEl = $("#contentInput");
    const writerEl = $("#writerInput");

    const title = titleEl.val();
    const content = contentEl.val();
    const writer = writerEl.val();

    if(title == "" || content == "" || writer ==""){
        alert("모든 항목을 입력해주세요.");
        return;
    }

    const trEl = $("<tr>");
    const date = new Date().toLocaleDateString();

    let html = `<td>${++num}</td>
                <td style="cursor:pointer;">${title}</td>
                <td>${content}</td>
                <td>${writer}</td>
                <td>${date}</td>
                <td><input type="checkbox"></td>`;
    trEl.html(html);
    $("table.board").append(trEl);

    // 제목 클릭 시 모달 열기 → row만 넘기기
    trEl.find("td:nth-child(2)").click(function() {
        showModal(this.parentElement);
    });
                   
    titleEl.val("");
    contentEl.val("");
    writerEl.val("");

    closeWrite();
}

// 제이쿼리 엔터로 게시물 올리기
$(document).ready(function() {
    $("#titleInput, #contentInput, #writerInput").on('keydown',
    function(e) {
        if(e.key == "Enter"){
            addBoard();
        }       
    });
});


// 엔터로 게시물 올리기
function addEnter(event){
    if(event.key == "Enter"){
        addBoard();
    }
}

// 삭제버튼 눌러서 게시물 지우기
function delBoard() {
    $("table.board tr:not(:first-child) input[type='checkbox']").each(function() {
        if ($(this).is(":checked")) {
            $(this).closest("tr").remove();
        }
    });
}

// 전체선택 전체해제
function allCheck(ckbk) {
    let check = ckbk.checked;   // 헤더 체크박스 의미
   $("td > [type='checkbox']").each(function() {
       $(this).prop("checked", check) 
    });
}

// 제이쿼리로 글쓰기 열기
$(document).ready(function() {
    $('[value="글쓰기"]').on('click',
    function () {
        $("#inputForm").show();
    });
});

// 글쓰기 열기
function openWrite() {
    $("#inputForm").show();
}

// 글쓰기 닫기
function closeWrite() {
    $("#inputForm").hide();
}

let editing = false;
let currentRow = null;

// 모달 열기 (row에서 최신 데이터 읽기)
function showModal(row){
    currentRow = row;

    let number = $(row).find("td").eq(0).text();
    let title = $(row).find("td").eq(1).text();
    let content = $(row).find("td").eq(2).text();
    let writer = $(row).find("td").eq(3).text();
    let date = $(row).find("td").eq(4).text();

    $("#modalNumber").text("글번호: " + number);
    $("#modalTitle").text("제목: " + title);
    $("#modalContent").text("내용: " + content);
    $("#modalWriter").text("작성자: " + writer);
    $("#modalDate").text("작성일자: " + date);
    $("#modal").show();

    $("#editModal").show();  
    $("#saveModal").hide();  
    $("#closeModal").show(); 
}

// 모달 닫기
function closeModal(){
    $("#modal").hide();
    editing = false;
    $("#editModal").show();
    $("#saveModal").hide();
}

// 게시글 수정
function editModal() {
    if(editing) return;
    editing = true;

    let titleEl = $("#modalTitle");
    let contentEl = $("#modalContent");
    let writerEl = $("#modalWriter");

    let title = titleEl.text().replace("제목: ", "");
    let content = contentEl.text().replace("내용: ", "");
    let writer = writerEl.text().replace("작성자: ", "");

    titleEl.html('제목: <input type="text" id="editTitle" value="' + title + '">');
    contentEl.html('내용: <input type="text" id="editContent" value="' + content + '">');
    writerEl.html('작성자: <input type="text" id="editWriter" value="' + writer + '">') ;

    $("#editModal").hide();
    $("#saveModal").show();
    $("#closeModal").show();
}

// 게시글 수정한거 저장
function saveModal() {
    let newTitle = $("#editTitle").val();
    let newContent = $("#editContent").val();
    let newWriter = $("#editWriter").val();

    $("#modalTitle").text("제목: " + newTitle);
    $("#modalContent").text("내용: " + newContent);
    $("#modalWriter").text("작성자: " + newWriter);

    if(currentRow){
        $(currentRow).find("td").eq(1).text(newTitle);
        $(currentRow).find("td").eq(2).text(newContent);
        $(currentRow).find("td").eq(3).text(newWriter);
    }

    editing = false;
    $("#editModal").show();
    $("#saveModal").hide();
    $("#closeModal").show();
}