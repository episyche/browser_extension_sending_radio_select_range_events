if (chrome.runtime) {
  console.originalWarn = console.warn;
  console.warn = function () {
      if (arguments.length == 1 && typeof arguments[0] === 'string' && arguments[0].startsWith('Manifest v2 support is deprecated and will be removed in a future version of Chrome.')) {
          return;
      } else {
          // console.originalWarn.apply(console, arguments);
      }
  };
  ;
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.type === "radioEvent") {
    let radioBtnId = message.message.event.id;
    let radioBtnValue = message.message.event.value;
    let radioBtnTypeFCE = message.message.event.type;
    let radioBtnTagNameFCE = message.message.event.tagName;
    let radioBtnChecked = message.message.event.checked;
    if (radioBtnId) {
        let createId = document.getElementById(radioBtnId);
        createId.value = radioBtnValue;
        createId.checked = radioBtnChecked;
    }
    else if (radioBtnTypeFCE) {
        let createBtnType = document.getElementsByTagName(radioBtnTagNameFCE);
        for (i = 0; i < createBtnType.length; i++) {
            if (radioBtnTypeFCE === createBtnType[i].type) {
                if (radioBtnValue !== createBtnType[i].value) {
                    createBtnType[i].checked = radioBtnChecked;
                }
            }
        }
    }
}
else if (message.type === "selectEvent") {
    let selectBoxId = message.message.event.id;
    let selectBoxValues = message.message.event.value;
    let selectBoxClassName = message.message.event.className;
    let selectBoxName = message.message.event.name;
    let selectBoxTagName = message.message.event.tagName;
    let selectBoxType = message.message.event.type;
    let selectBoxCheckeds = message.message.event.checked;
    let selectBoxIndex = message.message.event.classNameIndex;
    let selectBoxTagNameIndex = message.message.event.TagNameIndex;


    // 
    let selectBoxTagId = message.message.event.id;
    console.log("tag id", selectBoxTagId);
    let selectBoxTagValue = message.message.event.value;
    console.log("tag value", selectBoxTagValue);
    let selectBoxTagClassName = message.message.event.className;
    console.log("tag classname", selectBoxTagClassName);
    let selectBoxTagname = message.message.event.name;
    console.log("tagname", selectBoxTagname);
    let selectBoxListnerTagName = message.message.event.tagName;
    console.log("tagname", selectBoxListnerTagName);
    let selectBoxTagType = message.message.event.type;
    console.log("selectboxtype", selectBoxTagType);
    let selectBoxTagChecked = message.message.event.checked;
    console.log("selectboxtag checked", selectBoxTagChecked);
    let selectBoxTagIndex = message.message.event.classNameIndex;
    console.log("tag index", selectBoxTagIndex);
    let selectBoxListnerTagNameIndex = message.message.event.TagNameIndex;
    console.log("test", selectBoxListnerTagNameIndex);
    let selectBoxValue = message.message.event.value;
    let selectBoxChecked = message.message.event.checked;
    console.log("test89", selectBoxIndex);

    if (selectBoxId) {
        let createSelectBoxId = document.getElementById(selectBoxId);
        createSelectBoxId.value = selectBoxValues;
        createSelectBoxId.checked = selectBoxCheckeds;
    }
    if (selectBoxTagId) {
        let listnerSelectBoxId = document.getElementById(selectBoxTagId);
        console.log("listnerboxid", listnerSelectBoxId);
        listnerSelectBoxId.value = selectBoxValue;
        listnerSelectBoxId.checked = selectBoxChecked;
    }
   
    else if (selectBoxTagClassName) {
        let createSelectBoxClassName = document.getElementsByClassName(selectBoxTagClassName);
        console.log("test", createSelectBoxClassName);
        createSelectBoxClassName.value = selectBoxValue;
        createSelectBoxClassName.checked = selectBoxChecked;
    }

    else if (selectBoxTagIndex) {
        let selectBoxIndexCN = document.getElementsByTagName(selectBoxListnerTagName)
        console.log("selectboxindexcn", selectBoxIndexCN);
        console.log("test", selectBoxListnerTagNameIndex >= 0 && selectBoxIndexCN.length >= selectBoxListnerTagNameIndex);
        if (selectBoxListnerTagNameIndex >= 0 && selectBoxIndexCN.length >= selectBoxListnerTagNameIndex) {

            let index = selectBoxListnerTagNameIndex;
            console.log("index",index );
            let element = selectBoxIndexCN[index];
            console.log("element",element );
            element.value = selectBoxValue;
            element.checked = selectBoxChecked;
            console.log("checked", element.checked = selectBoxChecked );
        }
    }
    else if (selectBoxListnerTagNameIndex) {
        let selectBoxTagNameCN = document.getElementsByTagName(selectBoxTagNameCN)
        console.log("test", selectBoxTagNameCN);
        if (selectBoxListnerTagNameIndex >= 0 && selectBoxTagNameCN.length >= selectBoxListnerTagNameIndex) {
            console.log("test", selectBoxListnerTagNameIndex >= 0 && selectBoxTagNameCN.length >= selectBoxListnerTagNameIndex);
            let index = selectBoxListnerTagNameIndex;
            let element = selectBoxTagNameCN[index];
            element.value = selectBoxValue;
            element.checked = selectBoxChecked;
            console.log("test", element.checked = selectBoxChecked);
        }
    }
}

// RANGE(INPUT)
else if (message.type === "inputEvent") {
    let inputBtnId = message.message.event.id;
    let inputBtnType = message.message.event.type;
    let radioBtnTagName = message.message.event.tagName;
    let parentElement = message.message.event.parentElement;
    let inputBtnValue = message.message.event.value;
    let inputclassname = message.message.event.className;
    let inputBtnChecked = message.message.event.checked;
    let TagNameIndex = message.message.event.TagNameIndex;
    if (inputBtnId) {
        let inputId = document.getElementById(inputBtnId);
        inputId.value = inputBtnValue;
        inputId.checked = inputBtnChecked;
    }
   else if( inputclassname){
    let createInputCN = document.getElementsByClassName(inputclassname );
    for (let i=0; i< createInputCN.length; i++){
        if( createInputCN[i].type === inputBtnType){
            if(createInputCN[i].className === inputclassname )
            createInputCN.checked = inputBtnChecked;
        }
    }
   }
   else if (radioBtnTagName) {
    let inputType = document.getElementsByTagName(radioBtnTagName);
    let index = inputType[TagNameIndex]
    for (let i = 0; i < inputType.length; i++) {

        if (inputType[i].type === "checkbox") {
            if (inputBtnType === inputType[i].type) {
                if (inputBtnValue === inputType[i].value) {
                    inputType[i].checked = inputBtnChecked;
                }
            }
        }
    }
}
}
})


document.addEventListener('mouseup', function (e) {
  let createForType;
  if (e.target.tagName === "LABEL") {
      let forType = e.target.attributes;
      if (forType.for !== undefined) {
          let getForType = forType.for.value;
          createForType = document.getElementById(getForType);
      }
      else if (forType.for === undefined) {
          let parent = e.target.parentNode;
      }
      if (createForType !== undefined) {
          if (createForType.type === "radio") {
              chrome.runtime.sendMessage({
                  type: "radioEvent",
                  event: {
                      tagName: createForType.tagName,
                      value: createForType.value,
                      type: createForType.type,
                      className: createForType.className,
                      id: createForType.id,
                      checked: !createForType.checked
                  }
              })
          }
      }
  }
//   SELECT TAG
  else if (e.target.tagName === "SELECT") {
    let createSelectId;
    createSelectId = e.target;
    let boxid = createSelectId.id;
    let selectBoxId = e.target.attributes;

    createSelectId.addEventListener('change', function (e) {
        let listnerId = e.target.id;
        let listnerClassName = e.target.className;
        let listnerTagName = e.target.tagName;
        let listnerType = e.target.type;
        let listnerName = e.target.name;
        let parent = e.target.parentElement;
        

        let firstElementChild = e.target.lastChild;
        console.log("firstelementchild", firstElementChild);

        let createselectTagName = Array.from(document.getElementsByTagName(createSelectId.tagName));
        console.log("csn", createselectTagName);
        let selectBoxTagNameIndex = createselectTagName.findIndex((element) => element === createSelectId);
        console.log("cd", selectBoxTagNameIndex);

        let createClassTagName = Array.from(document.getElementsByClassName(createSelectId.className));
        console.log("csn", createClassTagName);
        let classTagData = createClassTagName.findIndex((element) => element === createSelectId);
        console.log("cd", classTagData);

        console.log("test", e.target);
        let selectedIndex = e.target.attributes;

        // if (selectedIndex !== undefined) {
        let getSelectId = selectedIndex.id;
        console.log("getselectid", getSelectId);
        createSelectId = e.target;
        let createClassName = Array.from(document.getElementsByClassName(createSelectId.className));
        console.log("csn", createClassName);
        let classData = createClassName.findIndex((element) => element === createSelectId);
        console.log("cd", classData);

        let createTagName = Array.from(document.getElementsByTagName(createSelectId.tagName));
        console.log("csn", createTagName);
        let TagNameData = createTagName.findIndex((element) => element === createSelectId);
        console.log("cd", TagNameData);

        let selectTagName = createSelectId.tagName;
        console.log("select tagname", selectTagName);
        let selectName = createSelectId.name;
        console.log("selectname", selectName);
        chrome.runtime.sendMessage({
            type: "selectEvent",
            event: {
                tagName: createSelectId.tagName,
                name: createSelectId.name,
                value: createSelectId.value,
                className: createSelectId.className,
                id: createSelectId.id,
                checked: !createSelectId.checked,
                type: createSelectId.type,
                classNameIndex: classData,
                TagNameIndex: TagNameData,

                EventClassName: e.target.className,
                Eventname: e.target.name,
                EventId: e.target.id,
                EventTagName: e.target.tagName,
                EventType: e.target.type,
                eventchecked: !e.target.checked,
                selectTagNameIndex: selectBoxTagNameIndex,
                selectclasstagIndex: createClassTagName

            }
        })
    })

}

// RANGE (INPUT)
else if (e.target.tagName === "INPUT") {
    let forType = e.target.attributes;
    let createForType = e.target;
    let parent = e.target.parentElement.tagName;
    let inputclassname = createForType.className;
    let createselectTagName = Array.from(document.getElementsByTagName(createForType.tagName));
    let selectBoxTagNameIndex = createselectTagName.findIndex((element) => element === createForType);

    if (createForType !== undefined) {
        {
            chrome.runtime.sendMessage({
                type: "inputEvent",
                event: {
                    type: createForType.type,
                    id: createForType.id,
                    value: createForType.value,
                    name: createForType.name,
                    tagName: createForType.tagName,
                    TagNameIndex: selectBoxTagNameIndex,
                    checked: !createForType.checked,
                    parentElement: createForType.parentElement.tagName,
                    className : createForType.className
                }
            })
        }
    }
}

})
