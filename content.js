function setListFlags() {
    var programs = document.getElementsByClassName("_eof4m4b");

    for(var i = 0; i < programs.length; i++) {
        var link = programs[i].getElementsByTagName("a")[0].href;

        var id = link.split("/")[link.split("/").length - 1];

        programs[i].dataset.id = id;
        
        function update(id, x) {
            fetch("https://www.khanacademy.org/api/internal/scratchpads/" + id)
            .then(response => response.json())
            .then(data => {
                var programs = document.getElementsByClassName("_eof4m4b");
    
                for(var i = 0; i < programs.length; i++) {
                    if(Number(programs[i].dataset.id) === data.id) {
                        programs[i].getElementsByClassName("_kt2szrr")[0].textContent = `${data.sumVotesIncremented + (data.sumVotesIncremented === 1 ? " Vote" : " Votes")} ${data.spinoffCount + (data.spinoffCount === 1 ? " Spin-Off" : " Spin-Offs")} ${data.flags.length + (data.flags.length === 1 ? " Flags" : " Flags")}`;
                        x(data.id, x);
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
        }

        update(id, update);
    }
}

if(window.location.href.includes("/projects") || window.location.href === "https://www.khanacademy.org/computing/computer-programming" || window.location.href === "https://www.khanacademy.org/computing/computer-programming/browse") {
    var checkLoad = window.setInterval(() => {
        if(document.getElementsByClassName("_eof4m4b").length === 60) {
            if(typeof document.getElementsByClassName("_eof4m4b")[0].getElementsByTagName("a")[0].href === "string") {
                setListFlags();
                window.clearInterval(checkLoad);
            }
        }
    }, 1000 / 60);
}
