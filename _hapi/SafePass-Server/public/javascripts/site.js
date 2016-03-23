function createHash(pwd,url){
            if (pwd.length >1){
                var domain = parseHost(url);
                //Create and update a hashobject
                if(domain.length<1){
                return {status:"err", msg:"What service do you want to log into today?"}
                }
                var shaObj = new jsSHA('SHA-512', "TEXT");
                shaObj.update(domain);
                shaObj.update(pwd);
                //Some sites have stupid rules, like max pwd length, capital letters etc....
                var final ="SAFE"+shaObj.getHash("HEX").substring(0,15);
                return{status:"ok", hash:final};
            }else{
                return {status:"err", msg:"Please enter a password!!"};
            }

}
function parseHost(url){
    var host = tldjs.getDomain(url);
    var psfx = tldjs.getPublicSuffix(url);
    host = host.replace(psfx,'');
    return host;
}

$(function(){
    $(document).on("click", "#btn", function(e){
        if($("#pass").val() == $("#pver").val()){
            var result = createHash($("#pass").val(),$("#domain").val());
            if(result.status=="ok"){
                $("#output").text(result.hash);
            }else{
                $("#output").text(result.msg);
            }
        }else{
            $("#output").text("Your passwords doesnt match - Make 'em!")
        }
    })
})
