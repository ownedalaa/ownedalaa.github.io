var before = document.getElementById("before");
var liner = document.getElementById("liner");
var command = document.getElementById("typer");
var textarea = document.getElementById("texter");
var terminal = document.getElementById("terminal");

var git = 0;
var pw = false;
let pwd = false;
var commands = [];
var admin = false;
setTimeout(function() {
    loopLines(banner, "", 80);
    textarea.focus();
}, 100);

window.addEventListener("keyup", enterKey);

console.log(
    "%cHai hackerato la mia password!😠",
    "color: #04ff00; font-weight: bold; font-size: 24px;"
);
console.log("%cPassword: '" + password + "' - Secondo te, cosa fa?🤔", "color: grey");

//init
textarea.value = "";
command.innerHTML = textarea.value;

//il prefisso iniziale è ospite
window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("liner").setAttribute('data-user', 'ospite');
});

function enterKey(e) {
    if (e.keyCode == 181) {
        document.location.reload(true);
    }
    if (pw) {
        let et = "*";
        let w = textarea.value.length;
        command.innerHTML = et.repeat(w);
        if (textarea.value === password) {
            pwd = true;
            admin = true;
            document.getElementById("liner").setAttribute('data-user', 'admin');
        }
        if (pwd && e.keyCode == 13) {
            loopLines(secret, "color2 margin", 120);
            command.innerHTML = "";
            textarea.value = "";
            pwd = false;
            pw = false;
            liner.classList.remove("password");
        } else if (e.keyCode == 13) {
            addLine("Password errata", "errore", 0);
            command.innerHTML = "";
            textarea.value = "";
            pw = false;
            liner.classList.remove("password");
        }
    } else {
        if (e.keyCode == 13) {
            commands.push(command.innerHTML);
            git = commands.length;
            const userPrefix = admin ? 'admin' : 'ospite';
            document.getElementById("liner").setAttribute('data-user', userPrefix);
            addLine(`${userPrefix}@aalibi:~$ ${command.innerHTML}`, "no-animation", 0);
            commander(command.innerHTML.toLowerCase());
            command.innerHTML = "";
            textarea.value = "";
        }
        if (e.keyCode == 38 && git != 0) {
            git -= 1;
            textarea.value = commands[git];
            command.innerHTML = textarea.value;
        }
        if (e.keyCode == 40 && git != commands.length) {
            git += 1;
            if (commands[git] === undefined) {
                textarea.value = "";
            } else {
                textarea.value = commands[git];
            }
            command.innerHTML = textarea.value;
        }
    }
}







function commander(cmd) {
    switch (cmd.toLowerCase()) {
        case "help":
            loopLines(help, "color2 margin", 80);
            break;
        case "whois":
            loopLines(whois, "color2 margin", 80);
            break;
        case "whoami":
            loopLines(whoami, "color2 margin", 80);
            break;
        case "video":
            addLine("Sto aprendo YouTube...", "color2", 80);
            setTimeout(function () {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            }, 400);
            break;
        case "sudo":
            addLine("Oh no, non sei un admin...", "color2", 80);
            setTimeout(function () {
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
            }, 1000);
            break;
        case "social":
            loopLines(social, "color2 margin", 80);
            break;
        case "secret":
            liner.classList.add("password");
            pw = true;
            break;
        //case "admin":
        //    liner.classList.add("password");
        //    pw = true;
        //    addLine("Inserisci la password per diventare admin", "color2", 0);
        //    break;
        case "projects":
            loopLines(projects, "color2 margin", 80);
            break;
        case "password":
            addLine("<span class=\"inherit\"> Stiamo scherzando? Dovrai provare qualcosa di più complicato!😂</span>", "error", 100);
            break;
        case "history":
            addLine("<br>", "", 0);
            loopLines(commands, "color2", 80);
            addLine("<br>", "command", 80 * commands.length + 50);
            break;
        case "email":
            addLine('Opening mailto:<a href="mailto:aalibi@chilesotti.it">aalibi@chilesotti.it</a>...', "color2", 80);
            newTab(email);
            break;
        case "clear":
            setTimeout(function () {
                terminal.innerHTML = '<a id="before"></a>';
                before = document.getElementById("before");
            }, 1);
            break;
        case "banner":
            loopLines(banner, "", 80);
            break;
        case "hayden":
            loopLines(hayden, "color2", 80);
            break;
            
        // socials
        case "youtube":
            addLine("Sto aprendo YouTube...", "color2", 80);
            newTab(youtube);
            break;
        case "twitter":
            addLine("Sto aprendo Twitter...", "color2", 0);
            newTab(twitter);
            break;
        case "linkedin":
            addLine("Sto aprendo LinkedIn...", "color2", 0);
            newTab(linkedin);
            break;
        case "instagram":
            addLine("Sto aprendo Instagram...", "color2", 0);
            newTab(instagram);
            break;
        case "github":
            addLine("Sto aprendo GitHub...", "color2", 0);
            newTab(github);
            break;
        default:
            addLine("<span class=\"inherit\">Comando non trovato, per la lista dei comandi, scrivere <span class=\"command\">'help'</span>.</span>", "errore", 100);
            break;
    }
}



function newTab(link) {
    setTimeout(function() {
        window.open(link, "_blank");
    }, 500);
}

function addLine(text, style, time) {
    var t = "";
    for (let i = 0; i < text.length; i++) {
        if (text.charAt(i) == " " && text.charAt(i + 1) == " ") {
            t += "&nbsp;&nbsp;";
            i++;
        } else {
            t += text.charAt(i);
        }
    }
    setTimeout(function() {
        var next = document.createElement("p");
        next.innerHTML = t;
        next.className = style;

        before.parentNode.insertBefore(next, before);

        window.scrollTo(0, document.body.offsetHeight);
    }, time);
}

function loopLines(name, style, time) {
    name.forEach(function(item, index) {
        addLine(item, style, index * time);
    });
}
