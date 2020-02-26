// import { MTLLoader } from "./MTLLoader.js";

THREE.MtlObjBridge=(function(){
    var MTLLoader = new  THREE.MTLLoader();
    function MtlObjBridge(){

    }
    MtlObjBridge.prototype={
        link: function ( processResult, assetLoader ) {

            if ( typeof assetLoader.addMaterials === 'function' ) {
    
                assetLoader.addMaterials( this.addMaterialsFromMtlLoader( processResult ), true );
    
            }
    
        },
    
        /**
         * Returns the array instance of {@link MTLLoader.MaterialCreator}.
         *
         * @param Instance of {@link MTLLoader.MaterialCreator}
         */
        addMaterialsFromMtlLoader: function ( materialCreator ) {
    
            let newMaterials = {};
            if ( materialCreator instanceof MTLLoader.MaterialCreator ) {
    
                materialCreator.preload();
                newMaterials = materialCreator.materials;
    
            }
            return newMaterials;
    
        }
    }
    return MtlObjBridge;
})()