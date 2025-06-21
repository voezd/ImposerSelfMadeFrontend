<script>
    import { socket } from "$lib/socket.js";
    import { onMount } from "svelte";

    onMount(() => {
        if(!socket.connected) {
            socket.connect();
        }

        socket.on("connect", () => {
            console.log("Verbunden als ", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Verbindung getrennt");
        });
    });

    let username = "";
    let assignedWord = "";

   

    socket.on("NewWord", data => 
    { 
        console.log("Empfangen:", data);
        assignedWord = data.word ?? `Tipp: ${data.hint}`;
    });

    socket.on("username-taken", name => {
        alert(`Der Name ${name} ist bereits vergeben`);
    });

    socket.on("joined-successfully", name => {
        alert(`Willkommen ${name}`);
    })

    function login()
    {
        if(!username.trim() || username === "") 
        {
            alert("Bitte gib einen Namen ein.");
            return;
        }
        else if(username.trim().startsWith("Furkan"))
        {
            alert("Keine unangemessene Wörter als Username");
            return;
        }

        socket.emit("join", { room: "room1", username });
    }

    function startGame() 
    {
        socket.emit("start-round", "room1");
    }

</script>

<section>
    <h1 class="ml-2 mb-3 text-4xl">Login</h1>

    <div class="mt-4 ml-4">
    <input type="text" placeholder="Name" bind:value={ username }>
    <button 
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 ml-2 rounded"
        on:click={ login }> Login </button>

    </div>

    <br>
    <div class="ml-2 mt-10">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" on:click={ startGame }>Spiel starten</button>
        <p class="mt-2">Dein Wort:</p>
        <span class="text-xl font-bold mt-2">{ assignedWord }</span>
    </div>
</section>
