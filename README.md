# modal_util
Criador e gerenciador de janelas modais baseado em javascript, jquery e bootstrap

# Site e YouTube

    Dev = Sergio A Pereira ou Sergio AP
    Site = https://www.programadordev.com
    Programador DEV = https://www.youtube.com/channel/UCl2PjDObJFEOu0oEH-CB0TQ
    Sergio truck games = https://www.youtube.com/channel/UC_mAQvSa84027vh06sUzWMg

# COMO USAR

# SEGUE AS DEPENDÊNCIAS PARA USAR A BIBLIOTECA

    <script src="https://code.jquery.com/jquery-3.4.1.js" integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU=" crossorigin="anonymous"></script> 
		
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
		integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
		crossorigin="anonymous"></script>

	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
		integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">

	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
		integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
		crossorigin="anonymous"></script>

# DEPOIS DE REFERENCIADO AS DEPENDÊNCIAS USAR A BIBLIOTECA MODAL_UTIL

    <script src="modal_util.js"></script>

# EXEMPLOS DE USO

# Primeiro instanciar o objeto ModalUtil:

    var modal = new ModalUtil();

# Exemplo 1

    <div class="row">
		<div class="col-md-4">
			<button class="btn btn-primary" id="btnExemplo1">EXEMPLO 1</button>
		</div>
	</div>

    (function () {

        $("#btnExemplo1").click(function () {

            modal.init({ nome_modal: "modal1", msg: "modal 1" });

            setTimeout(function () {

                modal.fechar("modal1");
            }, 2000);       
        });
    });
   
# Exemplo 2

    <div class="row">
		<div class="col-md-4">
			<button class="btn btn-primary" id="btnExemplo2">EXEMPLO 2</button>
		</div>
	</div>

    (function () {

        $("#btnExemplo2").click(function () {

            modal.init({
                titulo: "Atenção <small>Aviso muito importante!</small>", tipoModal: "aviso", botoes: {
                    "SAIR": function (refModAL) {
                        refModAL.fecharModal();
                    },
                    "LIMPAR": function (refModAL) {
                        refModAL.fecharModal();
                    },
                    "SALVAR": function (refModAL) {
                        refModAL.fecharModal();
                    }
                }
            }).corpo.html("EXEMPLO 2");
        });
    });

   

