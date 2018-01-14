import React, {Component} from 'react';
import './TermsAndConditions.css';

class TermsAndConditions extends Component {

    constructor(props) {
        super(props);

        window.scrollTo(0,0);

        this.props.changeNavbar("white");
    }

    render() {

        return (
            <div className="page" style={{background: "#eee"}}>
                <div className="container div-shadow text-left" style={{padding: "4%"}}>
                    <h1>Termos e Condições de Casarder™</h1>
                    <hr/>
                    <h3>1. Âmbito e Objeto das Condições Gerais da Plataforma</h3>
                    <p>
                        As presentes Condições Gerais destinam-se, com o formulário de reserva, e os demais elementos referidos nas mesmas, a regular os termos e as condições por que se regerá a prestação do Serviço Online pela Casarder™, com sede na Rua Dr. António Bernardino de Almeida, 431, 4200-072 Porto, sob o número único de matrícula e de identificação de pessoa coletiva nº 123456789, com o capital social de € 1000000.
                    </p>
                    <p>
                    O Serviço consiste na disponibilização, através do endereço casardercdio.ddns.net de acesso ao Serviço Online que, além de fornecer informação relativa a um conjunto de produtos e/ou serviços, permite ao Utilizador, por via eletrónica, reservar recintos nela divulgados, nos termos e condições aqui descritos.
                    </p>
                    <p>
                    A reserva de recintos deve ser feita por Utilizadores com idade igual ou superior a 18 (dezoito) anos (indivíduos com idade inferior terão de ter autorização dos seus representantes). Os elementos e informações transmitidos pelo Utilizador gozarão de plenos efeitos jurídicos, reconhecendo o Utilizador as aquisições eletrónicas, não podendo este alegar a falta de assinatura para incumprimento das obrigações assumidas.
                    </p>

                    <h3>2. Informação de Produto e Conteúdos</h3>
                    <p>
                    A Casarder fará todos os possíveis para que a informação apresentada não contenha erros tipográficos, sendo que serão rapidamente corrigidos sempre que estes ocorram. Caso reserve um recinto que tenha características diferentes às apresentadas online, tem o direito de proceder à resolução do contrato de compra nos termos legais aplicáveis.
                    </p>
                    <p>
                    A Casarder fará todos os possíveis para facilitar a experiência do utilizador aquando a reserva do recinto, com máximo de confiabilidade, mas é possível que, em determinados casos e devido a causas dificilmente controláveis pela Casarder, como erros humanos ou incidências nos sistemas informáticos, não seja possível disponibilizar algum dos produtos pedidos pelo Utilizador. Caso, após ter efetuado uma reserva, o mesmo não estiver disponível ou aberto para reserva, será avisado, por correio eletrónico. Nesse momento ser-lhe-á apresentada a possibilidade de anular a reserva com o respetivo reembolso, caso já tenha efetuado o respetivo pagamento.
                    </p>
                    <p>
                    Todas as informações sobre preço, recintos, especificações, ações promocionais e serviços poderão ser alterados a qualquer momento pela Casarder ou pelas organizações associadas a que os recintos se regem.
                    </p>

                    <h3>3. Responsabilidades</h3>

                    <ol>
                        <li>
                            Todos os produtos e serviços comercializados na Plataforma Online Casarder™ estão de acordo com a Lei Portuguesa e com os regulamentos decretados pela União Europeia.
                        </li>
                        <li>
                            A Plataforma possui os adequados níveis de segurança, contudo a Casarder não será responsável por quaisquer prejuízos sofridos pelo Utilizador e/ou por terceiros, em virtude de atrasos, interrupções, erros e suspensões de comunicações que tenham origem em fatores fora do seu controlo, nomeadamente, quaisquer deficiências ou falhas provocadas pela rede de comunicações ou serviços de comunicações prestados por terceiros, pelo sistema informático, pelos modems, pelo software de ligação ou eventuais vírus informáticos ou decorrentes do descarregamento (“download”) através do serviço de ficheiros infetados ou contendo vírus ou outras propriedades que possam afetar o equipamento do Utilizador. Se por algum motivo de erro de acesso ao sítio eletrónico da Plataforma Online Casarder™ houver impossibilidade de prestação de serviço, a Casarder não será responsável por eventuais prejuízos.
                        </li>
                        <li>
                            As consultas de dados e informação efetuadas no âmbito deste Serviço, presumem-se efetuadas pelo Utilizador, declinando a Casarder qualquer responsabilidade decorrente a utilização abusiva ou fraudulenta das informações obtidas.
                        </li>
                        <li>
                            A Casarder não será responsável por quaisquer perdas ou danos causados por utilizações abusivas do Serviço que lhe não sejam diretamente imputáveis a título de dolo ou culpa grave.
                        </li>
                        <li>
                            A Casarder não é responsável pelos prejuízos ou danos decorrentes do incumprimento ou cumprimento defeituoso do Serviço quando tal não lhe seja direta ou indiretamente imputável a título de dolo ou culpa grave, não se responsabilizando designadamente por (i) erros, omissões ou outras imprecisões relativos às informações disponibilizadas através do Serviço; (ii) danos causados por culpa do Utilizador ou de terceiros, incluindo as violações da propriedade intelectual, (iii) pelo incumprimento ou cumprimento defeituoso que resulte do cumprimento de decisões judiciais ou de autoridades administrativas ou (iv) pelo incumprimento ou cumprimento defeituoso que resulte da ocorrência de situações de força maior, ou seja, situações de natureza extraordinária ou imprevisível, exteriores à Casarder e que pela mesma não possam ser controladas, tais como incêndios, cortes de energia, explosões, guerras, tumultos, insurreições civis, decisões governamentais, greves, terramotos, inundações ou outros cataclismos naturais ou outras situações não controláveis pela Casarder que impeçam ou prejudiquem o cumprimento das obrigações assumidas.
                        </li>
                        <li>
                            <ol className="roman">A Casarder não garante que:
                                <li>o Serviço seja fornecido de forma ininterrupta, seja seguro, sem erros ou funcione de forma infinita;</li>
                                <li>a qualidade de qualquer produto, serviço, informação ou qualquer outro recinto reservado ou obtido através do Serviço preencha quaisquer expectativa do Utilizador em relação ao mesmo;</li>
                                <li>qualquer reserva obtida de qualquer forma através da utilização do Serviço é utilizado por conta e risco do Utilizador, sendo este o único responsável por qualquer dano causado ao seu sistema e equipamento informático ou por qualquer perda de dados que resultem dessa operação.</li>
                                <li>nenhum conselho ou informação, quer oral quer escrita, obtida pelo Utilizador de ou através do Serviço criará qualquer garantia que não esteja expressa nestas Condições Gerais.</li>
                            </ol>
                        </li>
                        <li>
                            <ol className="roman">O Utilizador aceita que a Casarder não pode de forma nenhuma ser responsabilizada por qualquer dano, incluindo, mas não limitado a danos por perdas de lucros, dados, conteúdos, ou quaisquer outras perdas (mesmo que tenha sido previamente avisado pelo Utilizador sobre a possibilidade da ocorrência desses danos), resultantes:
                                <li>do uso ou impossibilidade de uso do Serviço;</li>
                                <li>da dificuldade de obtenção de qualquer substituto de bens/serviços;</li>
                                <li>do acesso ou modificação não autorizado a bases de dados pessoais.</li>
                            </ol>
                        </li>
                    </ol>

                    <h3>4. Obrigações do Consumidor</h3>
                    <ol>
                        <li>
                            <ol className="roman">O utilizador compromete-se a:
                                <li>Facultar dados pessoais corretos;</li>
                                <li>Não utilizar identidades falsas;</li>
                            </ol>
                        </li>
                        <li>
                            Caso algum dos dados esteja incorreto, ou seja, insuficiente, e por esse motivo haja um atraso ou impossibilidade no processamento da reserva, a responsabilidade é do Utilizador, sendo que a Casarder declina qualquer responsabilidade. No caso de o consumidor violar alguma destas obrigações, a Casarder reserva-se no direto de eliminar futuras reservas, bloquear o acesso à loja, cancelar o fornecimento de quaisquer outros serviços disponibilizados em simultâneo pela Casarder ao mesmo Utilizador; e, ainda, não permitir o acesso futuro do Utilizador a algum ou quaisquer serviços disponibilizados pela Casarder.
                        </li>
                        <li>
                            É expressamente vedada a utilização dos produtos e serviços adquiridos para fins comerciais, designadamente para efeitos de revenda de bens.
                        </li>
                    </ol>

                    <h3>5. Privacidade e Proteção de Dados Pessoais</h3>
                    <ol>
                        <li>
                            A Casarder garante a confidencialidade de todos os dados fornecidos pelos Utilizadores.
                        </li>
                        <li>
                            Os dados pessoais identificados no formulário de encomenda como sendo de fornecimento obrigatório são indispensáveis à prestação do Serviço pela Casarder. A omissão ou inexatidão dos dados fornecidos pelo Utilizador são da sua única e inteira responsabilidade e podem dar lugar à recusa de prestação do Serviço pela Casarder.
                        </li>
                        <li>
                            Os dados pessoais do Utilizador serão processados e armazenados informaticamente e destinam-se a ser utilizados pela Casarder no âmbito da relação contratual e/ou comercial com o Utilizador e, em caso de autorização pelo Utilizador, os seus dados irão ser utilizados para reservas de recintos.
                        </li>
                        <li>
                            Nos termos da legislação aplicável, é garantido ao Utilizador, sem encargos adicionais, o direito de acesso, retificação e atualização dos seus dados pessoais, diretamente ou mediante pedido por escrito, bem como o direito de oposição à utilização dos mesmos para as finalidades previstas no número anterior, devendo para o efeito contactar a entidade responsável pelo tratamento dos dados pessoais: Casarder.
                        </li>
                        <li>
                            Segundo o Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, referenciando o artigo nº 5, o Utilizador tem direito à confidencialidade, segurança e proteção contra o tratamento dos dados não autorizados, sendo que os mesmos encontram-se encriptados na base de dados da aplicação, sendo o tempo de vida dos mesmo limitados à existência da conta do Utilizador.
                        </li>
                        <li>
                            Segundo o Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, referenciando o artigo nº 6, o Utilizador, ao aceitar os termos e condições presentes, consente que o endereço de correio eletrónico disponibilizado irá ser utilizador com cariz diferenciador dentro do programa e que irá ser utilizado para receber correio eletrónico da plataforma.
                        </li>
                        <li>
                            Segundo o Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, referenciando o artigo nº 13, o Utilizador tem direito a receber informações do responsável pelo tratamento de dados, que é a atual empresa, sendo as informações prontamente disponibilizadas anteriormente ou por contacto telefónico ou eletrónico, se necessário.
                        </li>
                        <li>
                            Segundo o Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, referenciando o artigo nº 15, os dados pessoais do Utilizador têm a finalidade de tornar a sua experiência mais agradável e também, para fins jurídicos e comerciais, com cariz diferenciador no sistema, também. O prazo previsto de conservação de dados corresponde ao tempo de vida útil da conta do Utilizador, mediante da sua opção de desativar ou eliminar a conta.
                        </li>
                        <li>
                            Referente ao artigo nº16 e 17 do Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, a plataforma disponibiliza a opção de o Utilizador eliminar a sua conta (sendo os seus dados pessoais, consequentemente, removidos permanentemente) ou desativar a mesma, ficando a sua conta num estado dormente, mas mantendo registo dos dados pessoais do Utilizador, referindo-se assim também ao artigo nº18 do Regulamento supramencionado.
                        </li>
                        <li>
                            Referente ao artigo nº18 do Regulamento da União Europeia 2016/679 do Parlamento Europeu e do Conselho, decretado a 27 de abril de 2016, o Utilizador é notificado, nomeadamente por correio eletrónico, se os seus dados pessoais foram retificados ou alterados.
                        </li>
                    </ol>

                    <h3>6. Cancelamento de reservas</h3>
                    <ol>
                        <li>
                            <h6>A pedido do Utilizador</h6>
                            <p>O Utilizador poderá efetuar o cancelamento da sua reserva através da plataforma, sendo contactado por correio eletrónico a notificar, em caso de sucesso, os dados do cancelamento.</p>
                            <p>A Casarder reserva-se no direito de não processar reservas, quando verificar alguma inconsistência nos dados pessoais apresentados ou observar má conduta por parte do comprador. A Casarder reserva-se no direito de não efetuar o processamento de qualquer reserva ou reembolso, no caso de se verificarem erros nos valores e/ou características dos produtos, quando estes decorrerem de problemas técnicos ou erros alheios à Casarder</p>
                        </li>
                    </ol>

                    <h3>7. Propriedade Intelectual</h3>
                    <ol>
                        <li>
                            A Plataforma é um site registado e o Serviço prestado pelo próprio site é da responsabilidade da Casarder.
                        </li>
                        <li>
                            O Utilizador reconhece que o Serviço contém informação confidencial e está protegido pelos direitos de autor e conexos, propriedade industrial e demais legislações aplicáveis.
                        </li>
                        <li>
                            O Utilizador reconhece que qualquer conteúdo que conste na publicidade, destaque, promoção ou menção de qualquer patrocinador ou anunciante está protegido pelas leis relativas a direitos de autor e direitos conexos, pelas leis relativas a propriedade industrial e outras leis de proteção de propriedade, pelo que qualquer utilização desses conteúdos apenas poderá ocorrer ao abrigo de autorização expressa dos respetivos titulares.
                        </li>
                        <li>
                            O Utilizador compromete-se a respeitar na íntegra os direitos a que se refere o número anterior, designadamente abstendo-se de praticar quaisquer atos que possam violar a lei ou os referidos direitos, tais como a reprodução, a comercialização, a transmissão ou a colocação à disposição do público desses conteúdos ou quaisquer outros atos não autorizados que tenham por objeto os mesmos conteúdos.
                        </li>
                    </ol>

                    <h3>8. Condições de Segurança do Serviço</h3>
                    <ol>
                        <li>O Utilizador compromete-se a observar todas as disposições legais aplicáveis, nomeadamente, a não praticar ou a fomentar a prática de atos ilícitos ou ofensivos dos bons costumes, tais como o envio indiscriminado de comunicações não solicitadas (spamming) em violação do disposto na legislação aplicável ao tratamento de dados pessoais e às comunicações publicitárias através de aparelhos de chamada automática, devendo ainda observar as regras de utilização do Serviço, sob pena de a Casarder suspender ou desativar o Serviço nos termos previstos no ponto 11.</li>
                        <li>Utilizador expressamente reconhece e aceita que a Rede IP constitui uma rede pública de comunicações eletrónicas suscetível de utilização por vários utilizadores, e como tal, sujeitas a sobrecargas informáticas, pelo que a Casarder não garante a prestação do Serviço sem interrupções, perda de informação ou atrasos.</li>
                        <li>A Casardernão garante igualmente a prestação do Serviço em situações de sobrecarga imprevisível dos sistemas em que o mesmo se suporta ou de força maior (situações de natureza extraordinária ou imprevisível, exteriores à Casarder e que pela mesma não possam ser controladas).</li>
                        <li>Em caso de interrupção da prestação do Serviço por razões de sobrecarga imprevisível dos sistemas em que o mesmo se suporta, a Casarder compromete-se a regularizar o seu funcionamento com a maior brevidade possível.</li>
                    </ol>

                    <h3>9. Suspensão e desativação do Serviço Plataforma</h3>
                    <ol>
                        <li>Independentemente de qualquer comunicação prévia ou posterior, a Casarder pode, em qualquer altura, e de acordo com o seu critério exclusivo, descontinuar a disponibilização do Serviço e ou parte do Serviço a um ou todos os Utilizadores.</li>
                        <li>
                            <ol className="lowerlatin">A Casarder reserva-se ainda o direito de suspender ou fazer cessar imediatamente o acesso ao Serviço, nos seguintes casos:
                                <li>Quando o Utilizador não observe as condições de utilização referidas no ponto 4 e outras referidas nas Condições Gerais;</li>
                                <li>Quando a Casarder cesse o acesso à Plataforma, mediante comunicação prévia com uma antecedência de 15 dias sobre a data de cessação.</li>
                            </ol>
                        </li>
                        <li>A suspensão ou a cessação do Serviço pela Casarder, nos termos dos números anteriores, não importa o direito do Utilizador ou terceiros a qualquer indemnização ou outra compensação, não podendo a Casarder ser responsabilizada ou de alguma forma onerada, por qualquer consequência resultante da suspensão, anulação, cancelamento do Serviço.</li>
                        <li>Nas situações acima descritas, a Casarder comunicará ao Utilizador, previamente por forma a que este possa, querendo, salvaguardar o conteúdo da sua área de visualização de encomendas no prazo de 3 (três) dias úteis a contar do envio do e-mail ou disponibilização da informação na página principal do Serviço.</li>

                    </ol>

                    <h3>10. Comunicações</h3>
                    <ol>
                        <li>Sem prejuízo de outras formas de comunicação previstas nas presentes Condições Gerais, as notificações efetuadas ao Utilizador que se relacionem com o Serviço, incluindo eventuais alterações às presentes Condições Gerais, poderão ser efetuadas para o endereço de correio eletrónico do Utilizador.</li>
                        <li>O Utilizador aceita receber toda e qualquer comunicação e/ou notificação relacionada com a Loja Online, para a morada, telefone de contacto e ou endereço de correio eletrónico (“e-mail”) indicados no processo de encomenda.</li>
                    </ol>

                    <h3>11. Configurações Técnicas</h3>
                    <ol>
                        <li>Sem prejuízo do disposto no número seguinte, a Casarder poderá alterar o Serviço e/ou as condições técnicas de prestação do mesmo, bem como as respetivas regras de utilização, devendo divulgar ao Utilizador tais alterações com uma antecedência mínima de 15 (quinze) dias.</li>
                        <li>A versão em cada momento em vigor das presentes Condições Gerais e dos seus anexos encontra-se disponível no sítio eletrónico casardercdio.ddns.net</li>
                    </ol>

                    <h3>12. Comunicações</h3>
                    <ol>
                        <li>Sempre que a Casarder entenda necessário ou conveniente otimizar a experiência de navegação e/ou melhorar as condições de conectividade, a mesma poderá reformular remotamente as configurações de rede.</li>
                        <li>Sem prejuízo do disposto nos números seguintes, e atento o carácter inovador do Serviço e as evoluções tecnológicas a que poderá estar sujeito, a Casarder poderá alterar as configurações técnicas do mesmo sempre que tal se revele conveniente para o adaptar a eventuais desenvolvimentos tecnológicos.</li>
                        <li>A Casarder não garante, no entanto, ao Utilizador a realização de quaisquer upgrades ou melhorias no Serviço.</li>
                        <li>Algumas upgrades ou novas funcionalidades do Serviço poderão estar disponíveis apenas contra pagamento do Utilizador e/ou subscrição, pelo mesmo, de Condições Específicas de utilização.</li>
                    </ol>
                    <h3>Lei Aplicável</h3>
                    <p>O Contrato rege-se pela lei portuguesa e pelo Regulamento Geral da Proteção de Dados.</p>
                </div>
            </div>

        );
    }
}

export default TermsAndConditions;