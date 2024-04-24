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
        let selectBoxTagId = message.message.event.id;
        let selectBoxTagValue = message.message.event.value;
        let selectBoxTagClassName = message.message.event.className;
        let selectBoxTagname = message.message.event.name;
        let selectBoxListnerTagName = message.message.event.tagName;
        let selectBoxTagType = message.message.event.type;
        let selectBoxTagChecked = message.message.event.checked;
        let selectBoxTagIndex = message.message.event.classNameIndex;
        let selectBoxListnerTagNameIndex = message.message.event.TagNameIndex;
        let selectBoxValue = message.message.event.value;
        let selectBoxChecked = message.message.event.checked;

        if (selectBoxTagId) {
            let listnerSelectBoxId = document.getElementById(selectBoxTagId);
            listnerSelectBoxId.value = selectBoxValue;
            listnerSelectBoxId.checked = selectBoxChecked;
        }

        else if (selectBoxTagClassName) {
            let createSelectBoxClassName = document.getElementsByClassName(selectBoxTagClassName);
            createSelectBoxClassName.value = selectBoxValue;
            createSelectBoxClassName.checked = selectBoxChecked;
        }

        else if (selectBoxTagIndex) {
            let selectBoxIndexCN = document.getElementsByTagName(selectBoxListnerTagName)
            if (selectBoxListnerTagNameIndex >= 0 && selectBoxIndexCN.length >= selectBoxListnerTagNameIndex) {
                let index = selectBoxListnerTagNameIndex;
                let element = selectBoxIndexCN[index];
                element.value = selectBoxValue;
                element.checked = selectBoxChecked;
            }
        }
        else if (selectBoxListnerTagNameIndex) {
            let selectBoxTagNameCN = document.getElementsByTagName(selectBoxTagNameCN)
            if (selectBoxListnerTagNameIndex >= 0 && selectBoxTagNameCN.length >= selectBoxListnerTagNameIndex) {
                let index = selectBoxListnerTagNameIndex;
                let element = selectBoxTagNameCN[index];
                element.value = selectBoxValue;
                element.checked = selectBoxChecked;
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
        else if (inputclassname) {
            let createInputCN = document.getElementsByClassName(inputclassname);
            for (let i = 0; i < createInputCN.length; i++) {
                if (createInputCN[i].type === inputBtnType) {
                    if (createInputCN[i].className === inputclassname)
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
        let createClassName = Array.from(document.getElementsByClassName(createSelectId.className));
        let classData = createClassName.findIndex((element) => element === createSelectId);
        let createTagName = Array.from(document.getElementsByTagName(createSelectId.tagName));
        let TagNameData = createTagName.findIndex((element) => element === createSelectId);
        let selectTagName = createSelectId.tagName;
        let selectName = createSelectId.name;
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
            }
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
                        className: createForType.className
                    }
                })
            }
        }
    }

})
