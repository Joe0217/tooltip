/**
 * Created by Joe on 16/4/28.
 */
var tooltip = {
    showAlert:function(tooltipCon,tooltipConfirm,callback){
        var tooltipCon = '<p id="tooltipText">'+tooltipCon+'</p><ul id="tooltipButtonBar"><li class="tooltipOneButton tooltipButton" id="tooltipConfirm">'+checkButtonNull(tooltipConfirm)+'</li></ul>';
        showTooltip(tooltipCon,callback);
    },
    showConfirm:function(tooltipCon,tooltipConfirm,tooltipCancel,callback){
        var tooltipCon = '<div id="tooltipText">'+tooltipCon+'</div><ul id="tooltipButtonBar"><li class="tooltipButton" id="tooltipCancel">'+checkButtonNull(tooltipCancel)+'</li><li class="tooltipCenterLine"></li><li class="tooltipButton" id="tooltipConfirm">'+checkButtonNull(tooltipConfirm)+'</li></ul>';
        showTooltip(tooltipCon,callback);
    },
    showCustom:function(backgroundImg,callback){
        var tooltipCon = '<div class="tooltipCustomCon" id="tooltipConfirm"><img class="tooltipCustomImg" src="'+backgroundImg+'"><div id="tooltipCancel" class="tooltipRightCloseButton"></div></div>';
        showTooltip(tooltipCon,callback);
    },
    showTextList:function(textArray,callback){
        var textContent = '';
        for (var text in textArray){
            textContent += '<li id='+text+'>'+textArray[text]+'</li>';
        }
        var tooltipCon = '<ul id="tooltipTextList">'+textContent+'</ul>';
        showTooltip(tooltipCon,callback);

        $('#tooltipCoating').bind('click',function(e){
            e.stopPropagation();
            closeTooltip();
        });
        $('#tooltipTextList li').bind('click',function(){
            closeTooltip();
            callback($(this).attr('id'));
        });
    },
    showTextAreas:function(tooltipTitle,tooltipPlaceholder,tooltipTextMaxLength,tooltipConfirm,tooltipCancel,callback){
        var tooltipCon = '<p class="tooltipTitle">'+tooltipTitle+'</p><textarea class="tooltipTextAreas tooltipTransition" id="tooltipTextAreas" placeholder='+tooltipPlaceholder+' maxlength='+tooltipTextMaxLength+'></textarea><ul id="tooltipButtonBar"><li class="tooltipButton" id="tooltipCancel">'+checkButtonNull(tooltipCancel)+'</li><li class="tooltipCenterLine"></li><li class="tooltipButton" id="tooltipTextAreasConfirm">'+checkButtonNull(tooltipConfirm)+'</li></ul>';
        showTooltip(tooltipCon,callback);
        $('#tooltipContent').addClass('tooltipTransition');

        var blessText = $('#tooltipTextAreas'),
            textAreasW = document.getElementById("tooltipTextAreas").offsetWidth;

        $('#tooltipTextAreasConfirm').bind('click',function(e){
            e.stopPropagation();
            closeTooltip();
            if (callback != null && callback != ''){
                callback(true,blessText.val());
            }
        });

        document.getElementById("tooltipTextAreas").addEventListener('input',function(e){
            var textLength = blessText.val().length;
            var lineCount = (textLength*14)/textAreasW;
            if (lineCount>1){
                lineCount = parseInt(lineCount);
                blessText.css({'height':''+22*(lineCount+1)+'px'});
                $('#tooltipContent').css({'top':''+(screen.height-22*(lineCount+1))/3+'px'});
            }else{
                blessText.css({'height':'22px'});
            }
        });
    },
    showPrompt:function(text){
        var promptBox = '<div id="tooltipPromptBox" class="tooltipOpacityAnimation"><p class="tooltipPrompt">'+text+'</p></div>';
        $('body').append(promptBox);
        $('.tooltipPrompt').css('left',''+(screen.width-($('.tooltipPrompt').width())*1.08)/2+'px');

        document.getElementById('tooltipPromptBox').style.opacity = '1';
        setTimeout(function () {
            document.getElementById('tooltipPromptBox').style.opacity = '0';
            setTimeout(function () {
                $('#tooltipPromptBox').remove();
            }, 350);
        }, 1500);
    }
};

function checkButtonNull(tooltipConfirm,tooltipCancel){
    if (tooltipConfirm == null || tooltipConfirm == ''){
        return '确定';
    }else {
        return tooltipConfirm;
    }
    if (tooltipCancel == null || tooltipCancel == ''){
        return '取消';
    }else {
        return tooltipCancel;
    }
}

function showTooltip(tooltipCon,callback){
    $('*').blur();
    var tooltipModel = '<div id="tooltipModel" class="tooltipTransition tooltipOpacityAnimation"><div id="tooltipCoating"></div><div id="tooltipContent">'+tooltipCon+'</div></div>';
    $('body').append(tooltipModel);
    bindFunction(callback);
}

function bindFunction (callback){
    $('#tooltipCoating').unbind('click');
    $('#tooltipConfirm').unbind('click');
    $('#tooltipCancel').unbind('click');
    $('#tooltipConfirm').bind('click',function(e){
        e.stopPropagation();
        closeTooltip();
        if (callback != null && callback != ''){
            callback(true);
        }
    });
    $('#tooltipCancel').bind('click',function(e){
        e.stopPropagation();
        closeTooltip();
        if (callback != null && callback != ''){
            callback(false);
        }
    });
    $('.tooltipButton').bind('touchstart',function(){
        $(this).addClass('touchBtn');
    });
    $('.tooltipButton').bind('touchend',function(){
        $(this).removeClass('touchBtn');
    });
}

function closeTooltip(){
    $('#tooltipModel').hide();
    setTimeout(function () {
        $('#tooltipModel').remove();
    }, 350);
}