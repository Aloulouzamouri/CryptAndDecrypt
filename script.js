// Fonction de chiffrement César
function cesarCipher(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let start = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
        } else {
            result += char;
        }
    }
    return result;
}

// Fonction de déchiffrement César
function cesarDecipher(text, shift) {
    return cesarCipher(text, 26 - shift); // Utilisez la fonction de chiffrement avec le complément à 26
}

// Fonction de chiffrement Vigenère
function vigenereCipher(text, key) {
    let result = "";
    key = key.toLowerCase();
    for (let i = 0, j = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let start = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            let shift = key[j].charCodeAt(0) - 'a'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - start + shift) % 26 + start);
            j = (j + 1) % key.length;
        } else {
            result += char;
        }
    }
    return result;
}

// Fonction de déchiffrement Vigenère
function vigenereDecipher(text, key) {
    let result = "";
    key = key.toLowerCase();
    for (let i = 0, j = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let start = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            let shift = key[j].charCodeAt(0) - 'a'.charCodeAt(0);
            result += String.fromCharCode((char.charCodeAt(0) - start - shift + 26) % 26 + start);
            j = (j + 1) % key.length;
        } else {
            result += char;
        }
    }
    return result;
}

// Fonction de chiffrement affine
function affineCipher(text, a, b) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let start = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode(((char.charCodeAt(0) - start) * a + b) % 26 + start);
        } else {
            result += char;
        }
    }
    return result;
}

// Fonction de déchiffrement affine
function affineDecipher(text, a, b) {
    let modInverse = function (a, m) {
        a = (a % m + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    };

    let result = "";
    let aInverse = modInverse(a, 26);
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[a-zA-Z]/)) {
            let start = char === char.toLowerCase() ? 'a'.charCodeAt(0) : 'A'.charCodeAt(0);
            result += String.fromCharCode((aInverse * (char.charCodeAt(0) - start - b + 26)) % 26 + start);
        } else {
            result += char;
        }
    }
    return result;
}

// Fonction pour valider si une valeur est un entier
function validateIntegerInput(value) {
    return /^\d+$/.test(value);
}

// Fonction pour chiffrer le texte en fonction de la méthode sélectionnée
function encrypt() {
    let inputText = document.getElementById("text").value;
    let method = document.getElementById("method").value;
    let resultElement = document.getElementById("result");

    let result = "";

    switch (method) {
        case "cesar":
            hideAffineKeys();
            let shift = parseInt(document.getElementById("key").value);
            if (!validateIntegerInput(shift)) {
                alert("Veuillez entrer un entier pour la clé de chiffrement César.");
                return;
            }
            result = cesarCipher(inputText, shift);
            break;
        case "vigenere":
            hideAffineKeys();
            let vigenereKey = document.getElementById("key").value;
            if (!/^[a-zA-Z]+$/.test(vigenereKey)) {
                alert("Veuillez entrer une clé de chiffrement Vigenère valide (lettres seulement).");
                return;
            }
            result = vigenereCipher(inputText, vigenereKey);
            break;
        case "affine":
            showAffineKeys();
            let a = parseInt(document.getElementById("key-a").value);
            let b = parseInt(document.getElementById("key-b").value);
            if (!validateIntegerInput(a) || !validateIntegerInput(b)) {
                alert("Veuillez entrer des entiers pour les clés 'a' et 'b' du chiffrement affine.");
                return;
            }
            result = affineCipher(inputText, a, b);
            break;
        default:
            hideAffineKeys();
            break;
    }

    resultElement.textContent = "Résultat : " + result;
}

// Fonction pour déchiffrer le texte en fonction de la méthode sélectionnée
function decrypt() {
    let inputText = document.getElementById("text").value;
    let method = document.getElementById("method").value;
    let resultElement = document.getElementById("result");

    let result = "";

    switch (method) {
        case "cesar":
            hideAffineKeys();
            let shift = parseInt(document.getElementById("key").value);
            if (!validateIntegerInput(shift)) {
                alert("Veuillez entrer un entier pour la clé de chiffrement César.");
                return;
            }
            result = cesarDecipher(inputText, shift);
            break;
        case "vigenere":
            hideAffineKeys();
            let vigenereKey = document.getElementById("key").value;
            if (!/^[a-zA-Z]+$/.test(vigenereKey)) {
                alert("Veuillez entrer une clé de chiffrement Vigenère valide (lettres seulement).");
                return;
            }
            result = vigenereDecipher(inputText, vigenereKey);
            break;
        case "affine":
            showAffineKeys();
            let a = parseInt(document.getElementById("key-a").value);
            let b = parseInt(document.getElementById("key-b").value);
            if (!validateIntegerInput(a) || !validateIntegerInput(b)) {
                alert("Veuillez entrer des entiers pour les clés 'a' et 'b' du chiffrement affine.");
                return;
            }
            result = affineDecipher(inputText, a, b);
            break;
        default:
            hideAffineKeys();
            break;
    }

    resultElement.textContent = "Résultat : " + result;
}

// Fonction pour afficher/masquer les champs de clés 'a' et 'b' lors de la sélection de la méthode affine
function updateKeyInputs() {
    let method = document.getElementById("method").value;
    if (method === "affine") {
        showAffineKeys();
    } else {
        hideAffineKeys();
    }
}

// Fonction pour afficher les champs de clé 'a' et 'b'
function showAffineKeys() {
    document.getElementById("key-a-container").style.display = "block";
    document.getElementById("key-b-container").style.display = "block";
}

// Fonction pour masquer les champs de clé 'a' et 'b'
function hideAffineKeys() {
    document.getElementById("key-a-container").style.display = "none";
    document.getElementById("key-b-container").style.display = "none";
}

// Appel initial pour masquer les clés 'a' et 'b'
hideAffineKeys();
