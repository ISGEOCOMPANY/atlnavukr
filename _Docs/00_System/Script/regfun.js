//<script language=javascript>
// **********************************************************************
// The hIdaho Frameset. Copyright (C) 1996 Bill Dortch, hIdaho Design.
// Permission is granted to use and modify the hIdaho Frameset code,
// provided this notice is retained.
// **********************************************************************
//	О.Литвиненко: 16.10.98
//	

var debug = false;
var amTopFrameset = true; // Встановити це до істини для головного frameset
var thisFrame = (amTopFrameset) ? null : self.name;
var maxFuncs = 32;


function makeArray (size) {
  this.length = size;
  for (var i = 1; i <= size; i++)
    this[i] = null;
  return this;
}
var funcs = new makeArray ((amTopFrameset) ? maxFuncs : 0);


function makeFunc (frame, func) {
  this.frame = frame;
  this.func = func;
  return this;
}

function addFunction (frame, func) {
  for (var i = 1; i <= funcs.length; i++)
    if (funcs[i] == null) {
      funcs[i] = new makeFunc (frame, func);
      return true;
    }
  return false;
}

function findFunction (func) {
  for (var i = 1; i <= funcs.length; i++)
    if (funcs[i] != null)
      if (funcs[i].func == func)
        return funcs[i];
  return null;
}


function Register (frame, func) {
  if (debug) alert (thisFrame + ": Register(" + frame + "," + func + ")");
  if (Register.arguments.length < 2)
    return false;
  if (!amTopFrameset)
    return parent.Register (thisFrame + "." + frame, func);
  if (findFunction (func) != null)
    return false;
  return addFunction (frame, func);
}

function UnRegister (func) {
  if (debug) alert (thisFrame + ": UnRegister(" + func + ")");
  if (UnRegister.arguments.length == 0)
    return false;
  if (!amTopFrameset)
    return parent.UnRegister (func);
  for (var i = 1; i <= funcs.length; i++)
    if (funcs[i] != null)
      if (funcs[i].func == func) {
        funcs[i] = null;
        return true;
      }
  return false;
}

function UnRegisterFrame (frame) {
  if (debug) alert (thisFrame + ": UnRegisterFrame(" + frame + ")");
  if (UnRegisterFrame.arguments.length == 0)
    return false;
  if (!amTopFrameset)
    return parent.UnRegisterFrame (thisFrame + "." + frame);
  for (var i = 1; i <= funcs.length; i++)
    if (funcs[i] != null)
      if (funcs[i].frame == frame) {
        funcs[i] = null;
      }
  return true;
}

function IsRegistered (func) {
  if (debug) alert (thisFrame + ": IsRegistered(" + func + ")");
  if (IsRegistered.arguments.length == 0)
    return false;
  if (!amTopFrameset)
    return parent.IsRegistered (func);
  if (findFunction (func) == null)
    return false;
  return true;
}

function Exec (func) {
  var argv = Exec.arguments;
  if (argv.length == 0)
    return null;
  var arglist = new makeArray(argv.length);
  for (var i = 0; i < argv.length; i++)
    arglist[i+1] = argv[i];
  var argstr = "";
  for (i = ((amTopFrameset) ? 2 : 1); i <= argv.length; i++)
    argstr += "arglist[" + i + "]" + ((i < argv.length) ? "," : "");
  if (!amTopFrameset)
    return eval ("parent.Exec(" + argstr + ")");
  var funcobj = findFunction (func);
  if (funcobj == null)
    return null;
  return eval("self." + ((funcobj.frame == null) ? "" : (funcobj.frame + "."))+ funcobj.func + "(" + argstr + ")");
}

// **********************************************************************
// End of hIdaho Frameset code.
// **********************************************************************
// end script</script>
