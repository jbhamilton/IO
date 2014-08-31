var IO = {};
IO.patterns = {
'alpha':'^[a-zA-Z\s\-]+$',
'alpha_numeric':'^[a-zA-Z\s\-0-9]+$',
'integer':'^[\-0-9]+$',
'numeric':'^[\-0-9\.]+$',
'all':'[.]*'
};

IO.cache = {};
IO.errors = {};

IO.set = function(e){
    var key = IO.tojQuery(e).selector;
    if(IO.cache[key]){
        return;
    }//if
    IO.cache[key] = IO.get(e);
}//listen

IO.subscribe = function(e,callback){
    var $e = IO.tojQuery(e),
        form = IO.get($e);
    for(attr in form){
        $e.find('[name="'+attr+'"]').change(function(){
            var o = {};
            if($(this).attr('type')=='checkbox'){
                o[$(this).attr('name')] = ($(this).prop('checked')) ? 'on' : 'off';
            }//if
            else {
                o[$(this).attr('name')] = $(this).val();
            }//el
            callback(o); 
        });
    }//for

}//listen

IO.changes = function(e){

    var key = IO.tojQuery(e).selector,
        cache = IO.cache[key],
        now = IO.get(e),
        changed = {},
        changes = false;

    for(var attr in now){
        if(now[attr] != cache[attr]){
            changes = true;
            IO.cache[key][attr] = now[attr];
            changed[attr] = now[attr];
        }//if
    }//for

    if(changes){
        return changed;
    }//if

    return false;

}//changes

IO.get = function(e){

    var $e = IO.tojQuery(e),
        errorCheck = ($e.attr('ioerrors')!==undefined) ? true : false;

    if( $e.parent().prop('tagName') != 'FORM' &&
        $e.prop('tagName') != 'FORM'
    ){
        $e.wrap('<form class="io-form"></form>');
        $e = $(e).parent();
    }//if

    if($e.prop('tagName') != 'FORM'){
        $e = $e.parent();
    }//if

    var i = $e.serialize(),
        o = {},
        s = i.split('&'),
        e = false;

    for(var iter = 0; iter < s.length; iter++){
        var ss = s[iter].split('='),
            key = ss[0],
            value = ss[1];
        o[key] = value;
        
        var $t = $e.find('[name="'+key+'"]');
        if(errorCheck && !IO.match($t)){
            e = true; 
            var $n = $t.next();
            if(!$n.hasClass('io-error')){
                return;
            }//if
            $n.css('display','block');
        }//if

    }//for

    if(errorCheck){
        if(e){
            $e.addClass('io-form-errors');
        }//if
        else {
            $e.removeClass('io-form-errors');
        }//el
    }//if

    $e.find('[type="checkbox"]').each(function(){
        if($(this).prop('checked')){
            return;
        }//if
        o[$(this).attr('name')] = 'off';
    });

    return o;

}//get

IO.match = function($i){
    var pattern = $i.attr('match');
    if(!pattern){
        return true;
    }//if

    if(IO.patterns[pattern]){
       pattern = IO.patterns[pattern]; 
    }//if

    pattern = new RegExp(pattern);
    var value = $i.val();

    if(value.match(pattern)){
        return true;
    }//if

    return false;
}//match

IO.hasError = function(e){
    IO.get(e);
    if(IO.tojQuery(e).parent().hasClass('io-form-errors') ||
       IO.tojQuery(e).hasClass('io-form-errors')
    ){
        return true;
    }//if
    return false;
}//hasError

IO.tojQuery = function(e){
    if(e instanceof jQuery){
        return e;
    }//if
    return $(e); 
}//tojQuery

$(function(){
    $('[ioerrors]').find('[match]').each(function(){
        $(this).change(function(){
            var $e = $(this).next();
            if(!$e.hasClass('io-error')){
                return;
            }//if
            if(IO.match($(this))){
                $e.css('display','none');
            }//if
            else {
                $e.css('display','block');
            }//el
        });
    });
    $('[ioerrors]').find('.io-error').css('display','none');
});
