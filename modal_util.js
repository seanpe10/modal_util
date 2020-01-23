function ModalUtil() {

    //Fonte = https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/find
    //Mantem a compatibilidade com navegadores antigos
    if (!Array.prototype.find) {

        Array.prototype.find = function (predicate) {

            if (this === null) {
                throw new TypeError('Array.prototype.find called on null or undefined');
            }
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }
            var list = Object(this);
            var length = list.length >>> 0;
            var thisArg = arguments[1];
            var value;

            for (var i = 0; i < length; i++) {
                value = list[i];
                if (predicate.call(thisArg, value, i, list)) {
                    return value;
                }
            }
            return undefined;
        };
    }
   
   /*
        Dev = Sergio A Pereira ou Sergio AP
        Site = https://www.programadordev.com
        Programador DEV = https://www.youtube.com/channel/UCl2PjDObJFEOu0oEH-CB0TQ
        Sergio truck games = https://www.youtube.com/channel/UC_mAQvSa84027vh06sUzWMg
   */

    'use strict'

    //Pega o contexto da classe
    var _context = this;

    var modais = [];

    _context.modal = function (nome_modal) {

        return modais.find(function (modal) {

            return modal.nome_modal === nome_modal;
        });
    };

    var removeModal = function (nome_modal) {

        _context.modal(nome_modal).refModal.modal("hide").remove();

        for (var i = 0; i < modais.length; i++) {

            if (modais[i].nome_modal === nome_modal) {
                modais.splice(i, 1);
                break;
            }
        }
    };

    var pegaNumeroRandonico = function () {

        return (Math.random()).toString().replace(".", "");
    }

    var setModalTamanhoMaximo = function (element) {

        var content = element.find('.modal-content');
        var borderWidth = content.outerHeight() - content.innerHeight();
        var dialogMargin = $(window).width() > 767 ? 60 : 20;
        var contentHeight = $(window).height() - (dialogMargin + borderWidth);
        var headerHeight = element.find('.modal-header').outerHeight() || 0;
        var footerHeight = element.find('.modal-footer').outerHeight() || 0;
        var maxHeight = contentHeight - (headerHeight + footerHeight);

        content.css({
            'overflow': 'hidden'
        });

        element
            .find('.modal-body').css({
                'max-height': maxHeight,
                'overflow-y': 'auto'
            });
    }

    var setModalLarguraMaximo = function (element) {

        if (element) {

            var tamanho = screen.width;
            var largura;

            switch (tamanho) {

                case 1920: largura = "60%"; break;
                case 1680: largura = "68%"; break;
                case 1600: largura = "72%"; break;
                case 1366: largura = "86%"; break;
                case 1360: largura = "86%"; break;
                case 1280: largura = "90%"; break;
                default: largura = "100%"; break;
            }

            element
                .find('.modal-lg').css({
                    'width': largura,
                });
        }
    }

    var estiloDefaul = function () {

        return {
            textAlign: "center",
            verticalAlign: "middle",
            border: "2px solid",
            backgroundColor: "#CCCCCC",
            fontWeight: "bold",
            color: "#2D3337",
            fontSize: "18pt",
        }
    };

    var estilos = function (parametros_funcao) {

        var css = {};

        //Se não passar um css personalizado adiciona um default
        if (!parametros_funcao.css) {

            if (parametros_funcao.tipoModal) {

                if (parametros_funcao.tipoModal === "default") {

                    css = estiloDefaul();
                }
                else if (parametros_funcao.tipoModal === "aviso") {

                    css.color = "red";
                    css.backgroundColor = "#FFFFCC";
                    css.textAlign = "center";
                    css.cursor = "pointer";
                    css.fontWeight = "bold";
                    css.fontSize = "18pt";
                }
                else if (parametros_funcao.tipoModal === "info") {

                    css.color = "blue";
                    css.backgroundColor = "White";
                    css.textAlign = "center";
                    css.cursor = "pointer";
                    css.fontWeight = "bold";
                    css.fontSize = "18pt";
                }
                else if (parametros_funcao.tipoModal === "erro") {

                    css.color = "red";
                    css.backgroundColor = "White";
                    css.textAlign = "center";
                    css.cursor = "pointer";
                    css.fontWeight = "bold";
                    css.fontSize = "18pt";
                }
                else if (parametros_funcao.tipoModal === "sucesso") {

                    css.color = "Green";
                    css.backgroundColor = "White";
                    css.textAlign = "center";
                    css.cursor = "pointer";
                    css.fontWeight = "bold";
                    css.fontSize = "18pt";
                }

                parametros_funcao.css = css;
            }
            else {

                css = estiloDefaul();
            }
        }

        parametros_funcao.css = parametros_funcao.css || estiloDefaul();
    }

    _context.init = function (_parametros_funcao) {

        var parametros_funcao;

        try {

            _context.fechar({
                funcaoCallBack: function () {

                    parametros_funcao = _parametros_funcao || {};

                    parametros_funcao.msg = parametros_funcao.msg || "AGUARDE...";

                    parametros_funcao.nome_modal = parametros_funcao.nome_modal || pegaNumeroRandonico();

                    parametros_funcao.tipoModal = parametros_funcao.tipoModal || "default";

                    abrirModal(undefined, parametros_funcao);
                }
            });

            return _context.modal(parametros_funcao.nome_modal);

        } catch (e) {

            alert(e.message);
        }
    }

    var adicionarBotoes = function (parametros_funcao) {

        var botoes = "";

        if (parametros_funcao.botoes) {
            
            var positivo_array = $.isArray(parametros_funcao.botoes);

            var primeiro_botao = 0;

            $.each(parametros_funcao.botoes, function (chave, valor) {

                var objBtn = this;

                var nome_btn = pegaNumeroRandonico();

                var classe = "";

                var classePorTipoModal = "";

                switch (parametros_funcao.tipoModal) {

                    case "erro": classePorTipoModal = "btn btn-secondary"; break;
                    case "sucesso": classePorTipoModal = "btn btn-secondary"; break;
                    case "iml": classePorTipoModal = "btn btn-secondary"; break;
                    case "aviso": classePorTipoModal = "btn btn-warning"; break;
                    case "info": classePorTipoModal = "btn btn-info"; break;
                    default: classePorTipoModal = "btn btn-secondary";
                }

                if (positivo_array) {

                    classe = objBtn.classe || classePorTipoModal;

                    if (primeiro_botao === 0)
                        classe = classe.replace("active", "") + " active";//Para não incerir 2 vezes a mesma classe

                    var titulo = objBtn.titulo || "";

                    botoes += "<button title='" + titulo + "' id='" + nome_btn + "' type='button' class='" + classe + "'>" + objBtn.texto + "</button>";
                }
                else {

                    classe = classePorTipoModal;

                    if (primeiro_botao === 0)
                        classe = classe.replace("active", "") + " active";//Para não incerir 2 vezes a mesma classe

                    botoes += "<button id='" + nome_btn + "' type='button' class='" + classe + "'>" + chave + "</button>";
                }

                if (positivo_array)
                    $(document).on("click", "button[id=" + nome_btn + "]", function () {

                        objBtn.funcao(_context.modal(parametros_funcao.nome_modal));
                    });
                else
                    $(document).on("click", "button[id=" + nome_btn + "]", function () {

                        valor(_context.modal(parametros_funcao.nome_modal));
                    });

                primeiro_botao++;
            });

            var divRodape = $("<div class='modal-footer'></div>");

            divRodape.append(botoes)

            _context.modal(parametros_funcao.nome_modal).conteudo.append(divRodape);

            _context.modal(parametros_funcao.nome_modal).rodape = _context.modal(parametros_funcao.nome_modal).refModal.find("div[class='modal-footer']");
        }
    }

    var adicionarCabecalho = function (parametros_funcao) {

        if (parametros_funcao.titulo) {

            var tituloTamanho = parametros_funcao.tituloTamanho || 4;

            var divCabecalho = $("<div class='modal-header'></div>");
            var divHTitulo = $("<h" + tituloTamanho + " class='modal-title' id='titulo_" + parametros_funcao.nome_modal + "'>" + parametros_funcao.titulo + "</h" + tituloTamanho + ">");

            if (parametros_funcao.permitir_fechar === true) {

                var idBtn = pegaNumeroRandonico();

                var divBtnFechar = $("<button id='" + idBtn + "' type='button' class='close'><span aria-hidden='true'>&times;</span></button>");

                $(document).on("click", "#" + idBtn, function () {

                    if (!parametros_funcao.funcaoCabecalho)
                        _context.fechar(parametros_funcao.nome_modal);
                    else
                        parametros_funcao.funcaoCabecalho(_context.modal(parametros_funcao.nome_modal));
                });

                divCabecalho.append(divBtnFechar);
            }
            //Fica dentro do conteudo antes do corpo
            _context.modal(parametros_funcao.nome_modal).corpo.before(divCabecalho.append(divHTitulo));
        }

        _context.modal(parametros_funcao.nome_modal).cabecalho = _context.modal(parametros_funcao.nome_modal).refModal.find("div[class='modal-header']");
    }

    var adicionaCorpo = function (parametros_funcao) {


        if (_context.modal(parametros_funcao.nome_modal).conteudo.find("div[class='modal-body']").length <= 0) {

            var divCorpo = $("<div class='modal-body'></div>");
            var imgTemp = $("<div class='row'>"
                + "<div class='col-md-12'>"
                + "<img id='imgPadraoModal' alt='' src='loading.gif' class='img-thumbnail img-responsive'/>"
                + "</div>"
                + "</div>");

            if (!parametros_funcao.img) divCorpo.append(imgTemp);

            divCorpo.append(parametros_funcao.msg);

            _context.modal(parametros_funcao.nome_modal).conteudo.append(divCorpo);
        }

        _context.modal(parametros_funcao.nome_modal).corpo = _context.modal(parametros_funcao.nome_modal).refModal.find("div[class='modal-body']");
        _context.modal(parametros_funcao.nome_modal).img = _context.modal(parametros_funcao.nome_modal).refModal.find("img[id='imgPadraoModal']");
    }

    var adicionaModal = function (parametros_funcao, refModal) {

        if (!refModal) {

            refModal = $("<div class='modal' id='" + parametros_funcao.nome_modal + "' tabindex='-1' role='dialog' aria-hidden='true''></div>");
            var divModalDialogo = $("<div class='modal-dialog modal-lg' role='document'></div>");
            var divModalConteudo = $("<div class='modal-content'></div>");
            refModal.append(divModalDialogo);
            divModalDialogo.append(divModalConteudo);
        }

        var modal = {};

        modal.refModal = refModal;
        modal.dialogo = modal.refModal.find("div[class='modal-dialog modal-lg']");
        modal.conteudo = modal.refModal.find("div[class='modal-content']");
        modal.nome_modal = parametros_funcao.nome_modal;
        modal.naoFechar = parametros_funcao.naoFechar || false;

        modais.push(modal);
    }

    var procedimentoFechar = function (parametros_funcao) {

        if (!parametros_funcao.fecharModal) {

            _context.modal(parametros_funcao.nome_modal).fecharModal = function () {

                if (parametros_funcao.antesFechar)
                    parametros_funcao.antesFechar(_context.modal(parametros_funcao.nome_modal));

                if (parametros_funcao.nome_modal.indexOf("#") !== -1) {

                    if (_context.modal(parametros_funcao.nome_modal).modal)
                        _context.modal(parametros_funcao.nome_modal).refModal.modal("hide");

                    if (_context.modal(parametros_funcao.nome_modal).cabecalho)
                        th_contextis.modal(parametros_funcao.nome_modal).cabecalho.remove();
                    if (_context.modal(parametros_funcao.nome_modal).rodape)
                        _context.modal(parametros_funcao.nome_modal).rodape.remove();
                }
                else {

                    if (_context.modal(parametros_funcao.nome_modal))
                        if (_context.modal(parametros_funcao.nome_modal).refModal.modal)
                            removeModal(parametros_funcao.nome_modal);
                }

                if (_context.modal(parametros_funcao.nome_modal))
                    removeModal(parametros_funcao.nome_modal);

                if (parametros_funcao.depoisFechar)
                    parametros_funcao.depoisFechar(_context.modal(parametros_funcao.nome_modal));
            };
        }
        else {

            if (parametros_funcao.antesFechar)
                parametros_funcao.antesFechar(_context.modal(parametros_funcao.nome_modal));

            _context.modal(parametros_funcao.nome_modal).fecharModal = parametros_funcao.fecharModal;

            if (parametros_funcao.depoisFechar)
                parametros_funcao.depoisFechar(_context.modal(parametros_funcao.nome_modal));
        }
    }

    var referenciaModal = function (parametros_funcao, refModal) {

        adicionaModal(parametros_funcao, refModal);
        adicionaCorpo(parametros_funcao);
        adicionarCabecalho(parametros_funcao);
        adicionarBotoes(parametros_funcao);
    }

    var abrirModal = function (refModal, parametros_funcao) {

        //Para alguma personalização antes de criar o modal
        if (parametros_funcao.antesCriado)
            parametros_funcao.antesCriado(_context.modal(parametros_funcao.nome_modal));

        //Significa que uma modal que esta hidden na página não é dinamica
        if (parametros_funcao.nome_modal.indexOf("#") !== -1)
            refModal = $(parametros_funcao.nome_modal);

        referenciaModal(parametros_funcao, refModal);

        $("html,body").css({ "overflow": "hidden" });

        $(_context.modal(parametros_funcao.nome_modal).refModal).modal({
            show: true
            , keyboard: false
            , backdrop: false
        });

        estilos(parametros_funcao);

        _context.modal(parametros_funcao.nome_modal).conteudo.css(parametros_funcao.css);

        procedimentoFechar(parametros_funcao);

        setModalTamanhoMaximo(_context.modal(parametros_funcao.nome_modal).refModal);

        if (!parametros_funcao.setModalLarguraMaximo)
            parametros_funcao.setModalLarguraMaximo = true;

        if (parametros_funcao.setModalLarguraMaximo)
            setModalLarguraMaximo(_context.modal(parametros_funcao.nome_modal).refModal);

        //Para alguma personalização depois de criar o modal, ex: adicionar eventos como holover
        if (parametros_funcao.depoisCriado)
            parametros_funcao.depoisCriado(_context.modal(parametros_funcao.nome_modal));

        if (parametros_funcao.modalNoDuploClick)
            parametros_funcao.modalNoDuploClick.hide().remove();
    }

    _context.fechar = function (parametros_funcao) {

        var nome_modal = "";

        if (typeof parametros_funcao === "string") {

            nome_modal = parametros_funcao;
            parametros_funcao = {};
            parametros_funcao.nome_modal = nome_modal;
        }

        if (parametros_funcao.nome_modal) {

            if (_context.modal(parametros_funcao.nome_modal)) {

                if (_context.modal(parametros_funcao.nome_modal).fecharModal)
                    _context.modal(parametros_funcao.nome_modal).fecharModal();
            }
        }
        else {

            var tamanho = modais.length;

            while (tamanho) {
                tamanho--;
                if (modais[tamanho].fecharModal && !modais[tamanho].naoFechar)
                    modais[tamanho].fecharModal();
            }
        }

        if (typeof parametros_funcao.funcaoCallBack === "function")
            parametros_funcao.funcaoCallBack();
    }

    _context.fecharTodos = function (funcaoCallBack) {

        var tamanho = modais.length;

        while (tamanho) {
            tamanho--;
            if (modais[tamanho].fecharModal)
                modais[tamanho].fecharModal();
        }

        if (typeof funcaoCallBack === "function")
            funcaoCallBack();
    }

    return _context;
}
